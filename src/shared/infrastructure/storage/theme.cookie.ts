import { createCookieSessionStorage } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET ?? 'DEFAULT_SECRET';

export const themeStorage = createCookieSessionStorage({
  cookie: {
    name: '__theme',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});
