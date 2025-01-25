import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject repository
     */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(
    createTagDto: CreateTagDto,
  ): Promise<Record<string, any>> {
    let tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    let results = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  public async delete(id: number): Promise<{ deleted: boolean; id: number }> {
    await this.tagsRepository.delete(1);

    return {
      deleted: true,
      id,
    };
  }

  public async softRemove(id: number) {
    await this.tagsRepository.softDelete(id);

    return {
      deleted: true,
      id,
    };
  }
}
