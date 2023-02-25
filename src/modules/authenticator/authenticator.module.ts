import { Module } from '@nestjs/common';
import { authenticatorProvider, sessionProvider } from './provider';
import { SignInBackend } from './server/sign-in.server';
import { SignUpBackend } from './server/sign-up.server';

@Module({
  providers: [
    authenticatorProvider,
    sessionProvider,
    SignInBackend,
    SignUpBackend,
  ],
  exports: [
    authenticatorProvider,
    sessionProvider,
    SignInBackend,
    SignUpBackend,
  ],
})
export class AuthenticatorModule {}
