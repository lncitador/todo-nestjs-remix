import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { wireAction, wireLoader } from 'nest-remix/core.server';
import { SetThemeBackend } from '~/shared/infrastructure/server/set-theme.server';

export const action: ActionFunction = (args) =>
  wireAction(SetThemeBackend, args);

export const loader: LoaderFunction = (args) =>
  wireLoader(SetThemeBackend, args);
