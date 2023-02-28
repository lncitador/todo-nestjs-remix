import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { wireAction, wireLoader } from 'nest-remix/core.server';
import { SetStoreBackend } from '~/shared/infrastructure/server/set-store.server';

export const action: ActionFunction = (args) =>
  wireAction(SetStoreBackend, args);

export const loader: LoaderFunction = (args) =>
  wireLoader(SetStoreBackend, args);
