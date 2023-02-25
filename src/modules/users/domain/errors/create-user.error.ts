type CreateUserErrorFields = {
  [k: string]: string[];
};

export class CreateUserError extends Error {
  constructor(
    public readonly message: string,
    public readonly fields: CreateUserErrorFields,
  ) {
    super(message);
    this.name = CreateUserError.name;
  }
}
