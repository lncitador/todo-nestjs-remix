export class DirectoryNotFoundError extends Error {
  constructor(id: string) {
    super(`Directory with id ${id} not found`);
    this.name = DirectoryNotFoundError.name;
  }
}
