import * as z from 'zod';
import * as imports from '../helpers';

export const AuthTokenSchema = z.object({
  id: z.number().int(),
  token: z.string(),
  usersId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
