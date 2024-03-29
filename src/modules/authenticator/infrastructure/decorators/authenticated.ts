import { DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Inject } from '@nestjs/common';
import { AuthenticatorProvider } from '../../domain/providers/authenticator.provider';
import { SessionAuthenticator } from '../services/session-authenticator.service';

const authenticatorKey = Symbol('authenticator');

export const Authenticated = (): MethodDecorator => {
  const injectAuthenticator = Inject(AuthenticatorProvider);

  return (
    target: Record<string, any>,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    injectAuthenticator(target, authenticatorKey);
    const originalMethod = descriptor.value;

    descriptor.value = async function (args: DataFunctionArgs) {
      const authenticator: SessionAuthenticator = (this as any)[
        authenticatorKey
      ];
      const isAuthenticated = await authenticator.isAuthenticated(''); // Todo: get cookie header

      if (!isAuthenticated) throw redirect('/login');
      return originalMethod.apply(this, [args]);
    };

    return descriptor;
  };
};
