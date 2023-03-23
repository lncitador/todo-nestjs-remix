import { BaseEntity } from './entity';

export type CreateData<T> = Omit<T, keyof BaseEntity>;
export type UpdateData<T> = Partial<Omit<T, keyof BaseEntity>>;

export abstract class RepositoryError extends Error {
  code: number;
}

export type RepositoryReturn<E, T> = [E, null] | [null, T];

export abstract class BaseRepository<
  T extends BaseEntity,
  E extends RepositoryError | Error = RepositoryError | Error,
> {
  public abstract create(data: CreateData<T>): Promise<RepositoryReturn<E, T>>;
  public abstract update(
    id: string,
    data: UpdateData<T>,
  ): Promise<RepositoryReturn<E, T>>;
  public abstract findById(id: string): Promise<RepositoryReturn<E, T>>;
  public abstract findMany(): Promise<RepositoryReturn<E, T[]>>;
  public abstract delete(id: string): Promise<RepositoryReturn<E, void>>;
  public abstract count?(): Promise<RepositoryReturn<E, number>>;
}
