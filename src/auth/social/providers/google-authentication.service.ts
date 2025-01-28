import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { User } from 'src/users/user.entity';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     * Inject jwtConfigurationService
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     *  Inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject generate tokens Provider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      console.log(loginTicket);

      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      const user = await this.usersService.findOneByGoogleId(googleId);

      if (user) {
        return this.generateTokensProvider.generateTokens(user as User);
      }

      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName,
        lastName,
        googleId,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      throw new UnauthorizedException(error, {
        description: 'unauthorized',
      });
    }
  }
}
