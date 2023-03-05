import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import * as imports from '../helpers';

export const UserModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character',
    ),
  avatar: z.string().nullable().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class UserDto extends createZodDto(UserModel) {}
