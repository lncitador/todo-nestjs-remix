import { RepositoryError } from '~/shared/domain/base/repository';

export class UserByEmailError extends RepositoryError {
  constructor(public readonly email: string) {
    super(`User with email ${email} not found`);
    this.name = UserByEmailError.name;
  }
}
