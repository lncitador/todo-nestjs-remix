import * as z from 'zod';
import * as imports from '../helpers';

export const UsersPermissionsSchema = z.object({
  id: z.number().int(),
  usersId: z.string(),
  permissionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
