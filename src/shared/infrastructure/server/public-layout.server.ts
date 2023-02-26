import { Injectable } from '@nestjs/common';
import { LoaderArgs } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { Loader, RemixArgs } from 'nest-remix';
import { redirect } from 'react-router';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';

@Injectable()
export class PublicLayoutBackend {
  constructor(private readonly authenticatorManager: AuthenticatorProvider) {}

  @Loader()
  public async getLayoutData(@RemixArgs() { request }: LoaderArgs) {
    const cookieHeader = request.headers.get('Cookie');
    const isAuthenticated = await this.authenticatorManager.isAuthenticated(
      cookieHeader,
    );

    if (isAuthenticated) {
      return redirect('/');
    }

    return json({
      isAuthenticated,
    });
  }
}
