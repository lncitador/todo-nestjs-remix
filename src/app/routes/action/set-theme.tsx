import { ActionFunction } from '@remix-run/node';
import { wireAction } from 'nest-remix/core.server';
import { SetThemeBackend } from './set-theme.server';

export const action: ActionFunction = (args) =>
  wireAction(SetThemeBackend, args);
