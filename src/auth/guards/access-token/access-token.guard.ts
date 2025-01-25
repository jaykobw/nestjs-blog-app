import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract request from context
    const request = context.switchToHttp().getRequest();

    //extract token
    const token = this.extractRequestFromHeader(request);

    //validate token
    if (!token) throw new UnauthorizedException('unauthorized');

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException('unauthorized');
    }

    return true;
  }
}
