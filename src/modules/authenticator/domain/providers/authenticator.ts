import { CurrentUser } from '../interfaces/authenticator.interface';

export abstract class AuthenticatorProvider {
  public abstract isAuthenticated(): Promise<boolean>;
  public abstract currentUser(): Promise<CurrentUser>;
}
