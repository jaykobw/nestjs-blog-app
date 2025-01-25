import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dtos';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginates.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Inject users service
     */
    private readonly usersService: UsersService,
    /**
     * Inject post repository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    /**
     * Inject MetaOptions Repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
    /**
     * Inject tag service
     */
    private readonly tagService: TagsService,
    /**
     * Injecting pagination provider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Inject createPostProvide
     */
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * Creating user post
   * @param userId
   * @returns {Promise<Record<string, any>>}
   */
  public async create(
    createPostDto: CreatePostDto,
    user: ActiveUserData,
  ): Promise<Post> {
    return await this.createPostProvider.create(createPostDto, user);
  }

  public async findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    let posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepository,
    );

    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags,
      post = undefined;

    // find tags
    try {
      tags = await this.tagService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later',
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
      );
    }

    // find the post
    post = await this.postRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!post) {
      throw new BadRequestException('The post ID does not exist');
    }

    // update properties
    post.title = patchPostDto.title ?? post.title;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.schema = patchPostDto.schema ?? post.schema;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Assign the new tags
    post.tags = tags;

    return await this.postRepository.save(post);
  }

  public async delete(id: number): Promise<{ deleted: boolean; id: number }> {
    await this.postRepository.delete(id);

    return {
      deleted: true,
      id,
    };
  }
}
