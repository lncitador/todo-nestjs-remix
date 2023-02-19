import { Module } from '@nestjs/common';
import { SessionAuthenticator } from './infrastructure/services/session-authenticator.service';
import { SessionManager } from './infrastructure/services/session-manager.service';

@Module({
  providers: [SessionAuthenticator, SessionManager],
  exports: [],
})
export class AuthenticatorModule {}
