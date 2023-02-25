import { Provider } from '@nestjs/common';
import { AuthenticatorProvider } from './domain/providers/authenticator.provider';
import { SessionProvider } from './domain/providers/session.provider';
import { SessionAuthenticator } from './infrastructure/services/session-authenticator.service';
import { SessionManager } from './infrastructure/services/session-manager.service';

export const authenticatorProvider: Provider = {
  provide: AuthenticatorProvider,
  useClass: SessionAuthenticator,
};

export const sessionProvider: Provider = {
  provide: SessionProvider,
  useClass: SessionManager,
};
