import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { DataSource } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject the datasource
     */
    private dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect the query ryunner to the datasource
    await queryRunner.connect();

    // Start the transaction
    await queryRunner.startTransaction();

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transcation', {
        description: String(error),
      });
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return newUsers;
  }
}
