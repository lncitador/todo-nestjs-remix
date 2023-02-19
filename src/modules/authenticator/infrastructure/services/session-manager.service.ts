import { Request } from 'express';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createCookieSessionStorage, Session } from '@remix-run/node';
import { SessionProvider } from '../../domain/providers/session';

@Injectable({ scope: Scope.REQUEST })
export class SessionManager {
  private storage;

  constructor(
    private readonly options: SessionProvider,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {
    this.storage = createCookieSessionStorage({ cookie: options });
  }

  public get() {
    return this.storage.getSession(this.request.headers.cookie);
  }

  public commit(session: Session) {
    return this.storage.commitSession(session);
  }

  public async destroy() {
    const session = await this.storage.getSession(this.request.headers.cookie);
    return this.storage.destroySession(session);
  }
}
