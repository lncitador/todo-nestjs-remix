import { createCookieSessionStorage } from '@remix-run/node';
import { SortItem } from './sort-list';

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

interface StoreSession {
  useTotal: [number, (total: number) => void];
  useSortBy: [SortItem, (item: SortItem) => void];
  useSideNavModal: [boolean, (open: boolean) => void];
  useAsideModal: [boolean, (open: boolean) => void];
  useNewTaskModal: [boolean, (open: boolean) => void];
  useListView: ['list' | 'grid', () => void];
  commit: () => Promise<string>;
}

export const getStoreSession = async (
  request: Request,
): Promise<StoreSession> => {
  const session = await storage.getSession(request.headers.get('Cookie'));

  return {
    useTotal: [
      session.get('total') ?? 0,
      (total) => session.set('total', total),
    ],
    useSortBy: [
      session.get('sortBy') ?? { label: 'Date', value: 'date' },
      (item) => session.set('sortBy', item),
    ],
    useSideNavModal: [
      session.get('sideNavModal') ?? false,
      (open) => session.set('sideNavModal', open),
    ],
    useAsideModal: [
      session.get('asideModal') ?? false,
      (open) => session.set('asideModal', open),
    ],
    useNewTaskModal: [
      session.get('newTaskModal') ?? false,
      (open) => session.set('newTaskModal', open),
    ],
    useListView: [
      session.get('listView') ?? 'list',
      () => session.set('listView', 'list'),
    ],
    commit: () => storage.commitSession(session),
  };
};
