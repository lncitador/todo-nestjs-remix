export class UserByEmailError extends Error {
  constructor(public readonly email: string) {
    super(`User with email ${email} not found`);
    this.name = UserByEmailError.name;
  }
}
