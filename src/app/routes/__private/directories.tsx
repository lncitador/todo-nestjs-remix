import { ActionFunction } from '@remix-run/node';
import { wireAction } from 'nest-remix/core.server';
import { DirectoriesBackend } from '~/modules/directories/server/directories.server';

export const action: ActionFunction = (args) =>
  wireAction(DirectoriesBackend, args);
