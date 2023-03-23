import * as z from 'zod';
import * as imports from '../helpers';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  rolesId: z.string().nullish(),
  rememberMeToken: z.string().nullish(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
