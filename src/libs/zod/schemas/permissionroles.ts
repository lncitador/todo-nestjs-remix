import * as z from 'zod';
import * as imports from '../helpers';

export const PermissionRolesSchema = z.object({
  id: z.number().int(),
  rolesId: z.string(),
  permissionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
