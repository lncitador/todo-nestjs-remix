import { Injectable } from '@nestjs/common';
import { LoaderArgs, redirect } from '@remix-run/node';
import { Loader, RemixArgs } from 'nest-remix/core.server';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';

@Injectable()
export class PrivateLayoutBackend {
  constructor(private readonly authenticatorManager: AuthenticatorProvider) {}

  @Loader()
  public async getLayoutData(@RemixArgs() { request }: LoaderArgs) {
    const cookieHeader = request.headers.get('Cookie');
    console.log('cookieHeader', cookieHeader);
    const isAuthenticated = await this.authenticatorManager.isAuthenticated(
      cookieHeader,
    );

    console.log(isAuthenticated);

    if (!isAuthenticated) {
      return redirect('/sign-in');
    }

    return redirect('/tasks');
  }
}
