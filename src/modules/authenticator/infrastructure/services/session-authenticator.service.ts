import { Injectable } from '@nestjs/common';
import { CurrentUser } from '../../domain/interfaces/authenticator.interface';
import { AuthenticatorProvider } from '../../domain/providers/authenticator';
import { SessionManager } from './session-manager.service';

@Injectable()
export class SessionAuthenticator implements AuthenticatorProvider {
  constructor(private readonly sessionManager: SessionManager) {}

  public async isAuthenticated() {
    const session = await this.sessionManager.get();
    return session.has('userId') && session.has('sessionId');
  }

  public async currentUser(): Promise<CurrentUser> {
    const session = await this.sessionManager.get();
    return {
      id: session.get('userId'),
      sessionId: session.get('sessionId'),
    };
  }
}
