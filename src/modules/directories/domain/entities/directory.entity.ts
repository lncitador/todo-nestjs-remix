import { DirectoryModel } from '~/libs/zod';
import { BaseEntity } from '~/shared/domain/base/entity';
import { Either, left, right } from '~/shared/domain/logic';
import { CreateDirectoryError } from '../errors/create-directory.error';

export interface DirectoryEntityProps {
  id?: string;
  name: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DirectoryEntity
  extends BaseEntity
  implements DirectoryEntityProps
{
  public readonly id: string;
  public readonly name: string;
  public readonly userId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(props: DirectoryEntityProps) {
    super();

    this.id = props.id || this.generateId();
    this.name = props.name;
    this.userId = props.userId;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public static create(
    props: DirectoryEntityProps,
  ): Either<Error, DirectoryEntity> {
    this.validateProps(props);

    return right(new DirectoryEntity(props));
  }

  private static validateProps(props: DirectoryEntityProps) {
    const validate = DirectoryModel.partial({
      id: true,
      createdAt: true,
      updatedAt: true,
    }).safeParse(props);

    if (validate.success === false) {
      throw left(
        new CreateDirectoryError(
          validate.error.message,
          validate.error.formErrors.fieldErrors,
        ),
      );
    }
  }

  public static from(props: DirectoryEntityProps): DirectoryEntity;
  public static from(props: DirectoryEntityProps[]): DirectoryEntity[];
  public static from(props: DirectoryEntityProps | DirectoryEntityProps[]) {
    if (Array.isArray(props)) {
      return props.map((prop) => new DirectoryEntity(prop));
    }

    return new DirectoryEntity(props);
  }
}
