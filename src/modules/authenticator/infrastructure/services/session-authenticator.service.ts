import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CurrentUser } from '../../domain/interfaces/authenticator.interface';
import { AuthenticatorProvider } from '../../domain/providers/authenticator.provider';
import { SessionManager } from './session-manager.service';

@Injectable()
export class SessionAuthenticator implements AuthenticatorProvider {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly sessionManager: SessionManager,
  ) {}

  public async isAuthenticated() {
    const cookieHeader = this.request.headers.cookie;

    if (!cookieHeader) {
      return false;
    }

    const session = await this.sessionManager.get(cookieHeader);
    return session.has('userId') && session.has('sessionId');
  }

  public async currentUser(): Promise<CurrentUser> {
    const cookieHeader = this.request.headers.cookie;
    const session = await this.sessionManager.get(cookieHeader);

    return {
      id: session.get('userId'),
      sessionId: session.get('sessionId'),
    };
  }
}
