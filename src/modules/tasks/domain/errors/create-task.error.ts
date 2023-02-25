import { ErrorFields } from '~/shared/domain/interfaces/error-fields.interface';

export class CreateTaskError extends Error {
  constructor(message: string, public readonly fields: ErrorFields) {
    super(message);
    this.name = CreateTaskError.name;
  }
}
