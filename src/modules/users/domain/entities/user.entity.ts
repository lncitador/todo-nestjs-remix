import { UserSchema } from '~/libs/zod';
import { BaseEntity } from '~/shared/domain/base/entity';
import { Either, Maybe, left, right } from '~/shared/domain/logic';
import { CreateUserError } from '../errors/create-user.error';

export interface UserEntityProps {
  id: string;
  email: string;
  name: string;
  rolesId: Maybe<string>;
  password: string;
  rememberMeToken: Maybe<string>;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity extends BaseEntity implements UserEntityProps {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly rolesId: Maybe<string>;
  public readonly password: string;
  public readonly rememberMeToken: Maybe<string>;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(props: UserEntityProps) {
    super();

    this.id = props.id || this.generateId();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public static create(
    props: UserEntityProps,
  ): Either<CreateUserError, UserEntity> {
    this.validateProps(props);

    return right(new UserEntity(props));
  }

  private static validateProps(props: UserEntityProps) {
    const validate = UserSchema.partial({
      id: true,
      createdAt: true,
      updatedAt: true,
    }).safeParse(props);

    if (validate.success === false) {
      return left(
        new CreateUserError(
          validate.error.message,
          validate.error.flatten().fieldErrors,
        ),
      );
    }
  }

  public static from(props: UserEntityProps): UserEntity;
  public static from(props: UserEntityProps[]): UserEntity[];
  public static from(
    props: UserEntityProps | UserEntityProps[],
  ): UserEntity | UserEntity[] {
    if (Array.isArray(props)) {
      return props.map((item) => new UserEntity(item));
    }

    return new UserEntity(props);
  }
}
