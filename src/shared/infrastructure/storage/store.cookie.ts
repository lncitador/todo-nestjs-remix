import { createCookieSessionStorage } from '@remix-run/node';

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is required');
}

export const storeStorage = createCookieSessionStorage({
  cookie: {
    name: '__store',
    secure: true,
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});
