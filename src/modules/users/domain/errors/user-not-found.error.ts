export class UserNotFound extends Error {
  constructor(public readonly id: string) {
    super(`User with id ${id} not found`);
    this.name = UserNotFound.name;
  }
}
