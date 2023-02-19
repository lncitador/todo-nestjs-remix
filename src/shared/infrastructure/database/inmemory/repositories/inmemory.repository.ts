import { Injectable } from '@nestjs/common';
import { Entity } from '~/shared/domain/base/entity';
import { Repository } from '~/shared/domain/base/repository';

@Injectable()
export class InMemoryRepository<
  TDto extends Entity,
  TEntity = TDto,
> extends Repository<TDto, TEntity> {
  protected readonly inmemoryData: TDto[];

  constructor(private readonly dataMock?: TDto[]) {
    super();
    this.inmemoryData = this.dataMock || [];
  }

  public async create(data: TDto): Promise<TEntity> {
    if (this.dataMock) {
      throw new Error(
        'Se possivel, não use o create para criar novos registros, caso tenha dados mockados,',
      );
    }
    data.id =
      this.inmemoryData.length > 0 ? this.inmemoryData.slice(-1)[0].id + 1 : 1;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const count = this.inmemoryData.push(data as any);

    return this.inmemoryData[count - 1] as any;
  }

  public async getAll(): Promise<TEntity[]> {
    return this.inmemoryData as any;
  }

  public async getById(id: number): Promise<TEntity> {
    return this.inmemoryData.find((item) => item.id === id) as any;
  }

  public async getMany(filter: Partial<TDto>): Promise<TEntity[]> {
    let filtered = this.inmemoryData;

    for (const key in filter) {
      filtered = filtered.filter((item) => item[key] === filter[key]);
    }
    return filtered as any;
  }

  public async getOne(filter: Partial<TDto>): Promise<TEntity> {
    return this.inmemoryData.find((item) => item.id === filter.id) as any;
  }

  public async patch(
    id: number,
    data: Partial<TDto>,
  ): Promise<TEntity | undefined> {
    const index = this.getIndexById(id);

    if (index) {
      for (const key in data) {
        data.updatedAt = new Date();
        const item = data[key];

        if (item) {
          this.inmemoryData[index][key] = item;
        }
      }

      return this.inmemoryData[index] as any;
    }

    return undefined;
  }

  public async update(id: number, data: TDto): Promise<TEntity> {
    const index = this.getIndexById(id);

    if (index >= 0) {
      data.updatedAt = new Date();
      this.inmemoryData[index] = { ...this.inmemoryData[index], ...data };
      return this.inmemoryData[index] as any;
    }

    throw new Error('Registro não encontrado');
  }

  public delete(id: number): Promise<void> {
    const index = this.getIndexById(id);

    if (index) {
      this.inmemoryData.splice(index, 1);
    }

    throw new Error('Registro não encontrado');
  }

  private getIndexById(id: number) {
    const index = this.inmemoryData.findIndex((item) => item.id === id);
    return index;
  }

  public async count() {
    return this.inmemoryData.length;
  }
}
