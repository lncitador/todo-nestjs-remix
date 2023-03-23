import { Module } from '@nestjs/common';
import { authenticatorProvider, sessionProvider } from './provider';
import { SignInBackend } from './server/sign-in.server';

@Module({
  providers: [authenticatorProvider, sessionProvider, SignInBackend],
  exports: [authenticatorProvider, sessionProvider, SignInBackend],
})
export class AuthenticatorModule {}
