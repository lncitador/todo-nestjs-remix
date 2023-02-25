import { BaseRepository } from '~/shared/domain/base/repository';
import { Either } from '~/shared/domain/logic';
import { UserEntity } from '../entities/user.entity';
import { UserByEmailError } from '../errors/user-by-email.error';

export abstract class IUsersRepository extends BaseRepository<
  UserEntity,
  Error
> {
  public abstract findByEmail(
    email: string,
  ): Promise<Either<UserByEmailError, UserEntity>>;
}
