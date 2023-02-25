import { ActionFunction } from '@remix-run/node';
import { wireAction } from 'nest-remix/core.server';
import { DirectoryByIdBackend } from '~/modules/directories/server/directory-by-id.server';

export const action: ActionFunction = (args) =>
  wireAction(DirectoryByIdBackend, args);
