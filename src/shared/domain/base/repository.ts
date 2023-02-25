import { Either } from '../logic';
import { BaseEntity } from './entity';

export type CreateData<T> = Omit<T, keyof BaseEntity>;
export type UpdateData<T> = Partial<Omit<T, keyof BaseEntity>>;

export abstract class BaseRepository<T extends BaseEntity, R = Error> {
  public abstract create<L = R, A = T>(
    data: CreateData<T>,
  ): Promise<Either<L, A>>;

  public abstract update<L, A = T>(
    id: string,
    data: UpdateData<T>,
  ): Promise<Either<L, A>>;

  public abstract findById<L, A = T>(id: string): Promise<Either<L, A>>;

  public abstract findMany<L, A = T[]>(): Promise<Either<L, A>>;

  public abstract delete<L, A = void>(id: string): Promise<Either<L, A>>;

  public abstract count?(): Promise<number>;
}
