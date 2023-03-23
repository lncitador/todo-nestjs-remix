import { RepositoryError } from '~/shared/domain/base/repository';

type CreateUserErrorFields = {
  [k: string]: string[];
};

export class CreateUserError extends RepositoryError {
  constructor(
    public readonly message: string,
    public readonly fields: CreateUserErrorFields,
  ) {
    super(message);
    this.name = CreateUserError.name;
  }
}
