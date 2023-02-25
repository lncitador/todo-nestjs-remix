import { useContext } from 'react';
import { StoreContext, StoreContextProps } from '../contexts/store';

type StoreHook = (
  state: StoreContextProps,
) => StoreContextProps[keyof StoreContextProps];

export function useStore<T extends StoreHook>(hook: T): ReturnType<T> {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return hook(store) as ReturnType<T>;
}
