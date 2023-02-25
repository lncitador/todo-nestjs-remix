import React from 'react';
import { createContext, ReactNode } from 'react';
import { SortItem } from '../utils/sort-list';

export interface StoreContextProps {
  useTotal: [number, (total: number) => void];
  useSortBy: [SortItem, (item: SortItem) => void];
  useSideNavModal: [boolean, () => void];
  useAsideModal: [boolean, () => void];
  useNewTaskModal: [boolean, () => void];
  useListView: ['list' | 'grid', () => void];
}

export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined,
);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [total, setTotal] = React.useState(0);
  const [sortBy, setSortBy] = React.useState<SortItem>({
    title: 'Order added',
    value: 'order-added',
  } as SortItem);
  const [sideNavModal, setSideNavModal] = React.useState(false);
  const [asideModal, setAsideModal] = React.useState(false);
  const [newTaskModal, setNewTaskModal] = React.useState(false);
  const [listView, setListView] = React.useState<'list' | 'grid'>('list');

  const tsn = () => setSideNavModal((state) => !state);
  const ta = () => setAsideModal((state) => !state);
  const tnt = () => setNewTaskModal((state) => !state);
  const t = () => setListView((state) => (state === 'list' ? 'grid' : 'list'));

  return (
    <StoreContext.Provider
      value={{
        useTotal: [total, (total) => setTotal(total)],
        useSortBy: [sortBy, (item) => setSortBy(item)],
        useSideNavModal: [sideNavModal, tsn],
        useAsideModal: [asideModal, ta],
        useNewTaskModal: [newTaskModal, tnt],
        useListView: [listView, t],
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
