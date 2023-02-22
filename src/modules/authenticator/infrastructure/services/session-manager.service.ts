import { Injectable } from '@nestjs/common';
import { createCookieSessionStorage, Session } from '@remix-run/node';
import {
  SessionConfig,
  SessionProvider,
} from '~/modules/authenticator/domain/providers/session.provider';
import { Maybe } from '~/shared/domain/logic';

@Injectable()
export class SessionManager implements SessionProvider {
  private storage;

  constructor(private readonly options: SessionConfig) {
    this.storage = createCookieSessionStorage({ cookie: options });
  }
  public async get(cookieHeader: Maybe<string>): Promise<Session> {
    return this.storage.getSession(cookieHeader);
  }
  public async commit(session: Session): Promise<string> {
    return this.storage.commitSession(session);
  }
  public async destroy(session: Session): Promise<void> {
    await this.storage.destroySession(session);
  }
}
