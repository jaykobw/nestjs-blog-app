import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserParamDto } from '../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Injecting users repository
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    /**
     * Inject usersCreateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    /**
     * Inject create user provider
     */
    private readonly createUserProvider: CreateUserProvider,
    /**
     * Inject findOneUserbyEmailProvider
     */
    private readonly findOneUserbyEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * The method to get all users from database
   * @param getUserParamDto
   * @param limit
   * @param page
   * @returns Array<{}>
   */
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        file: 'user.service.ts',
        lineNumber: 68,
      },
      HttpStatus.MOVED_PERMANENTLY,
    );
  }

  /**
   * Finds a single user using the ID of the user
   * @param id
   * @returns {}
   */
  public async findOneById(id: number): Promise<User | NotFoundException> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) return new NotFoundException('User not found');

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserbyEmailProvider.findOnebyEmail(email);
  }
}
