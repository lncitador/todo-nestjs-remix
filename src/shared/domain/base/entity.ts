/**
 * @export {class} Entity
 * @classdesc Base class for all entities.
 *
 */

export abstract class Entity {
  id!: number;
  createdAt?: Date;
  updatedAt?: Date;
}
