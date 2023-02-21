/**
 * @export {class} Entity
 * @classdesc Base class for all entities.
 *
 */

import { randomUUID } from 'crypto';
import { BaseRepository } from './repository';

export abstract class BaseEntity {
  public abstract id: string;
  public abstract createdAt?: Date;
  public abstract updatedAt?: Date;

  protected generateId(): string {
    return randomUUID();
  }

  public fill(data: Partial<Omit<this, keyof BaseEntity>>): void {
    Object.assign(this, {
      ...this,
      ...data,
    });
  }

  public async save(repository: BaseRepository<this>): Promise<this> {
    const entity = await repository.create(this);

    if (entity.isRight()) {
      return entity.value;
    }

    throw entity.value;
  }
}
