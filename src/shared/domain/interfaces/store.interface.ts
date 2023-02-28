import { SortItem } from '~/app/utils/sort-list';

export interface StoreContextProps {
  useTotal: [number, (total: number) => void];
  useSortBy: [SortItem, (item: SortItem) => void];
  useSideNavModal: [boolean, () => void];
  useAsideModal: [boolean, () => void];
  useNewTaskModal: [boolean, () => void];
  useListView: ['list' | 'grid', () => void];
  useRememberMe: [{ email?: string }, (email?: string) => void];
}

export type StoreContextState = {
  [key in keyof StoreContextProps]: StoreContextProps[key][0];
};

export type StoreSession = Pick<
  StoreContextProps,
  'useSortBy' | 'useListView' | 'useRememberMe'
>;

export type StoreSessionState = {
  [key in keyof StoreSession]: StoreSession[key][0];
};

export type StoreSessionAction = {
  [key in keyof StoreSession]: StoreSession[key][1];
};
