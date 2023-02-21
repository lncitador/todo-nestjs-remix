export abstract class IEncryptPassword {
  public abstract encrypt(password: string): Promise<string>;
  public abstract compare(password: string, hash: string): Promise<boolean>;
}
