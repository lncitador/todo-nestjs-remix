import { SessionIdStorageStrategy } from '@remix-run/node';

export abstract class SessionProvider
  implements Pick<SessionIdStorageStrategy, 'cookie'> {}
