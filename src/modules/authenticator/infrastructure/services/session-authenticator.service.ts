import { Injectable } from '@nestjs/common';
import { CurrentUser } from '../../domain/interfaces/authenticator.interface';
import { AuthenticatorProvider } from '../../domain/providers/authenticator.provider';
import { SessionProvider } from '../../domain/providers/session.provider';

@Injectable()
export class SessionAuthenticator implements AuthenticatorProvider {
  constructor(private readonly sessionManager: SessionProvider) {}

  public async isAuthenticated(cookieHeader: string) {
    const session = await this.sessionManager.get(cookieHeader);
    return session.has('userId') && session.has('sessionId');
  }

  public async currentUser(cookieHeader: string): Promise<CurrentUser> {
    const session = await this.sessionManager.get(cookieHeader);

    return {
      id: session.get('userId'),
      sessionId: session.get('sessionId'),
    };
  }
}
