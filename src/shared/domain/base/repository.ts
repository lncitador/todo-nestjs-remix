import { Entity } from './entity';

export abstract class Repository<T extends Entity, D = T> {
  public abstract create(data: T): Promise<D>;
  public abstract update(id: number, data: Partial<T>): Promise<D>;
  public abstract getById(id: number): Promise<D>;
  public abstract getAll(): Promise<D[]>;
  public abstract delete(id: number): Promise<void>;
  public abstract count?(): Promise<number>;
}
