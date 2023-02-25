import { ErrorFields } from '~/shared/domain/interfaces/error-fields.interface';

export class CreateDirectoryError extends Error {
  constructor(
    public readonly message: string,
    public readonly fields: ErrorFields,
  ) {
    super(message);
    this.name = 'CreateDirectoryError';
  }
}
