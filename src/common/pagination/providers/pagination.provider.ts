import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../interfaces/paginates.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Injecting request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    let results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    const baseURL = this.request.protocol + '://' + this.request.hostname + '/';
    const newURL = new URL(this.request.url, baseURL);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;

    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const response: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems,
        currentPage: paginationQuery.page,
        totalPages,
      },
      links: {
        first: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
      },
    };

    return response;
  }
}
