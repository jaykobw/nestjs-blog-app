import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Inject users-repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    /**
     * Inject hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // check user exists with email
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    // Handle exception
    if (existingUser) throw new BadRequestException('User already exists');

    // Create a new user
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }
}
