import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    /**
     * Inject usersService
     */
    private readonly usersService: UsersService,
    /**
     * Inject tagService
     */
    private readonly tagService: TagsService,
    /**
     * Inject postRepository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async create(
    createPostDto: CreatePostDto,
    user: ActiveUserData,
  ): Promise<Post> {
    let author = undefined;
    let tags = undefined;

    try {
      // find author from database based on authorId
      author = await this.usersService.findOneById(user.sub);

      // find tags
      tags = await this.tagService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (createPostDto.tags.length !== tags.length)
      throw new BadRequestException('Please check your tag Ids');

    let post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      return await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not a duplicate',
      });
    }
  }
}
