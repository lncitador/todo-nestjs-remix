import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseEntity } from '~/shared/domain/base/entity';
import { BaseRepository, CreateData } from '~/shared/domain/base/repository';
import { Either, left, right } from '~/shared/domain/logic';

@Injectable()
export class InMemoryRepository<
  TDto extends BaseEntity,
  TError = unknown,
> extends BaseRepository<TDto, TError> {
  protected readonly inmemoryData: TDto[];

  constructor(private readonly dataMock?: TDto[]) {
    super();
    this.inmemoryData = this.dataMock || [];
  }

  public async create<L = TError, A = TDto>(
    data: CreateData<TDto>,
  ): Promise<Either<L, A>> {
    if (this.dataMock) {
      return left(
        new Error(
          'Se possivel, não use o create para criar novos registros, caso tenha dados mockados,',
        ) as any,
      );
    }

    const entity = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.inmemoryData.push(entity as any);

    return right(entity as any);
  }
  public async update<L, A = TDto>(
    id: string,
    data: Partial<TDto>,
  ): Promise<Either<L, A>> {
    const index = this.inmemoryData.findIndex((item) => item.id === id);

    if (index >= 0) {
      data.updatedAt = new Date();
      this.inmemoryData[index] = { ...this.inmemoryData[index], ...data };
      return right(this.inmemoryData[index] as any);
    }

    return left(new Error('Registro não encontrado') as any);
  }
  public async getById<L, A = TDto>(id: string): Promise<Either<L, A>> {
    const entity = this.inmemoryData.find((item) => item.id === id);

    if (entity) {
      return right(entity as any);
    }

    return left(new Error('Registro não encontrado') as any);
  }
  public async getAll<L, A = TDto[]>(): Promise<Either<L, A>> {
    return right(this.inmemoryData as any);
  }
  public async delete<L, A = void>(id: string): Promise<Either<L, A>> {
    const index = this.inmemoryData.findIndex((item) => item.id === id);

    if (index >= 0) {
      this.inmemoryData.splice(index, 1);
      return right(undefined as any);
    }

    return left(new Error('Registro não encontrado') as any);
  }
  public async count?(): Promise<number> {
    return this.inmemoryData.length;
  }
}
