import { Maybe } from '~/shared/domain/logic';
import { CurrentUser } from '../interfaces/authenticator.interface';

export abstract class AuthenticatorProvider {
  public abstract isAuthenticated(
    cookieHeader: Maybe<string>,
  ): Promise<boolean>;

  public abstract currentUser(
    cookieHeader: Maybe<string>,
  ): Promise<CurrentUser>;
}
