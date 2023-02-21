import { Either } from '../logic';
import { BaseEntity } from './entity';

export type CreateData<T> = Omit<T, keyof BaseEntity>;

export abstract class BaseRepository<T extends BaseEntity, R = Error> {
  public abstract create<L = R, A = T>(
    data: CreateData<T>,
  ): Promise<Either<L, A>>;

  public abstract update<L, A = T>(
    id: string,
    data: Partial<T>,
  ): Promise<Either<L, A>>;

  public abstract getById<L, A = T>(id: string): Promise<Either<L, A>>;

  public abstract getAll<L, A = T[]>(): Promise<Either<L, A>>;

  public abstract delete<L, A = void>(id: string): Promise<Either<L, A>>;

  public abstract count?(): Promise<number>;
}
