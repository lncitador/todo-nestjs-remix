import { createCookieSessionStorage } from '@remix-run/node';
import { StoreSessionAction, StoreSessionState } from '../contexts/store';

const sessionSecret = process.env.SESSION_SECRET ?? 'DEFAULT_SECRET';

const storage = createCookieSessionStorage({
  cookie: {
    name: '__store',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});

interface Store {
  state: StoreSessionState;
  action: StoreSessionAction;
  commit: () => Promise<string>;
}

export const getStoreSession = async (request: Request): Promise<Store> => {
  const session = await storage.getSession(request.headers.get('Cookie'));

  const state: StoreSessionState = {
    useRememberMe: JSON.parse(session.get('rememberMe') || '{}'),
    useSortBy: JSON.parse(session.get('sortBy') || '{}'),
    useListView: session.get('listView'),
  };

  const action: StoreSessionAction = {
    useRememberMe: (email) => session.set('rememberMe', email),
    useSortBy: (sort) => session.set('sortBy', sort),
    useListView: () => {
      return session.set(
        'listView',
        state.useListView === 'grid' ? 'list' : 'grid',
      );
    },
  };

  return {
    state,
    action,
    commit: () => storage.commitSession(session),
  };
};
