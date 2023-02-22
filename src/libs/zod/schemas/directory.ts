import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import * as imports from '../helpers';

export const DirectoryModel = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class DirectoryDto extends createZodDto(DirectoryModel) {}
