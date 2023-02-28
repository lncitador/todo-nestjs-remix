import { useFetcher } from '@remix-run/react';
import React, { ReactNode } from 'react';
import { createContext } from 'react';
import {
  StoreContextProps,
  StoreContextState,
  StoreSessionState,
} from '~/shared/domain/interfaces/store.interface';

type Action = {
  [key in keyof StoreContextProps]: StoreContextProps[key][1];
};

interface StoreProviderProps {
  children: ReactNode;
  store?: StoreSessionState;
}

export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined,
);

export const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
  store,
}) => {
  const [state, setState] = React.useState<StoreContextState>(() => ({
    useTotal: 0,
    useSortBy: store?.useSortBy || {
      title: 'Order added',
      value: 'order-added',
    },
    useSideNavModal: false,
    useAsideModal: false,
    useNewTaskModal: false,
    useListView: store?.useListView || 'list',
    useRememberMe: store?.useRememberMe || {},
  }));

  const setTotal = React.useCallback<Action['useTotal']>(
    (total) => setState({ ...state, useTotal: total }),
    [state.useTotal],
  );

  const setSortBy = React.useCallback<Action['useSortBy']>(
    (item) => setState({ ...state, useSortBy: item }),
    [state.useSortBy],
  );

  const setSideNavModal = React.useCallback<Action['useSideNavModal']>(
    () => setState({ ...state, useSideNavModal: !state.useSideNavModal }),
    [state.useSideNavModal],
  );

  const setAsideModal = React.useCallback<Action['useAsideModal']>(
    () => setState({ ...state, useAsideModal: !state.useAsideModal }),
    [state.useAsideModal],
  );

  const setNewTaskModal = React.useCallback<Action['useNewTaskModal']>(
    () => setState({ ...state, useNewTaskModal: !state.useNewTaskModal }),
    [state.useNewTaskModal],
  );

  const setListView = React.useCallback<Action['useListView']>(
    () =>
      setState({
        ...state,
        useListView: state.useListView === 'list' ? 'grid' : 'list',
      }),
    [state.useListView],
  );

  const setRememberMe = React.useCallback<Action['useRememberMe']>(
    (email) => setState({ ...state, useRememberMe: { email } }),
    [state.useRememberMe.email],
  );

  const persistStore = useFetcher();

  const persistRef = React.useRef(persistStore);
  React.useEffect(() => {
    persistRef.current = persistStore;
  }, [persistStore]);

  React.useEffect(() => {
    persistRef.current.submit(
      {
        useSortBy: JSON.stringify(state.useSortBy),
      },
      { action: 'action/set-store', method: 'post' },
    );
  }, [state.useSortBy]);

  React.useEffect(() => {
    persistRef.current.submit(
      {
        useListView: state.useListView,
      },
      { action: 'action/set-store', method: 'post' },
    );
  }, [state.useListView]);

  React.useEffect(() => {
    persistRef.current.submit(
      {
        useRememberMe: JSON.stringify(state.useRememberMe),
      },
      { action: 'action/set-store', method: 'post' },
    );
  }, [state.useRememberMe]);

  return (
    <StoreContext.Provider
      value={{
        useTotal: [state.useTotal, setTotal],
        useSortBy: [state.useSortBy, setSortBy],
        useSideNavModal: [state.useSideNavModal, setSideNavModal],
        useAsideModal: [state.useAsideModal, setAsideModal],
        useNewTaskModal: [state.useNewTaskModal, setNewTaskModal],
        useListView: [state.useListView, setListView],
        useRememberMe: [state.useRememberMe, setRememberMe],
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
