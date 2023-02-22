import { Session, SessionIdStorageStrategy } from '@remix-run/node';
import { Maybe } from '~/shared/domain/logic';

export abstract class SessionConfig
  implements Pick<SessionIdStorageStrategy, 'cookie'> {}

export abstract class SessionProvider {
  public abstract get(cookieHeader: Maybe<string>): Promise<Session>;
  public abstract commit(session: Session): Promise<string>;
  public abstract destroy(session: Session): Promise<void>;
}
