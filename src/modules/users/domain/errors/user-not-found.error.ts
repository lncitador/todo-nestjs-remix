import { RepositoryError } from '~/shared/domain/base/repository';

export class UserNotFound extends RepositoryError {
  constructor(public readonly id: string) {
    super(`User with id ${id} not found`);
    this.name = UserNotFound.name;
  }
}
