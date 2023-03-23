import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseEntity } from '~/shared/domain/base/entity';
import {
  BaseRepository,
  CreateData,
  RepositoryError,
  RepositoryReturn,
} from '~/shared/domain/base/repository';

@Injectable()
export class InMemoryRepository<
  TDto extends BaseEntity,
> extends BaseRepository<TDto> {
  protected readonly inmemoryData: TDto[];

  constructor(private readonly dataMock?: TDto[]) {
    super();
    this.inmemoryData = this.dataMock || [];
  }

  public async create(
    data: CreateData<TDto>,
  ): Promise<RepositoryReturn<RepositoryError | Error, TDto>> {
    const entity = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as TDto;

    this.inmemoryData.push(entity);

    return [null, entity];
  }

  public async update(
    id: string,
    data: Partial<TDto>,
  ): Promise<RepositoryReturn<RepositoryError | Error, TDto>> {
    const entity = this.inmemoryData.find((item) => item.id === id);

    if (!entity) {
      return [new DefaultRepositoryError('Entity not found'), null];
    }

    const updatedEntity = {
      ...entity,
      ...data,
    } as TDto;

    const index = this.inmemoryData.findIndex((item) => item.id === id);

    this.inmemoryData[index] = updatedEntity;

    return [null, updatedEntity];
  }

  public async findById(
    id: string,
  ): Promise<RepositoryReturn<RepositoryError | Error, TDto>> {
    const entity = this.inmemoryData.find((item) => item.id === id);

    if (!entity) {
      return [new DefaultRepositoryError('Entity not found'), null];
    }

    return [null, entity];
  }

  public async findMany(): Promise<
    RepositoryReturn<RepositoryError | Error, TDto[]>
  > {
    return [null, this.inmemoryData];
  }

  public async delete(
    id: string,
  ): Promise<RepositoryReturn<RepositoryError | Error, void>> {
    const index = this.inmemoryData.findIndex((item) => item.id === id);

    if (index === -1) {
      return [new DefaultRepositoryError('Entity not found'), null];
    }

    this.inmemoryData.splice(index, 1);

    return [null, null as any];
  }
  public async count?(): Promise<
    RepositoryReturn<RepositoryError | Error, number>
  > {
    return [null, this.inmemoryData.length];
  }
}

class DefaultRepositoryError extends RepositoryError {
  constructor(message: string) {
    super(message);
  }
}
