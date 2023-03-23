import {
  BaseRepository,
  RepositoryReturn,
} from '~/shared/domain/base/repository';
import { UserEntity } from '../entities/user.entity';
import { UserByEmailError } from '../errors/user-by-email.error';

export abstract class IUsersRepository extends BaseRepository<UserEntity> {
  public abstract findByEmail(
    email: string,
  ): Promise<RepositoryReturn<UserByEmailError, UserEntity>>;
}
