import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Inject user repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOnebyEmail(email: string) {
    let user: User | undefined = undefined;

    console.log(process.env.DATABASE_PASSWORD);

    try {
      user = await this.usersRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'User not found',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
