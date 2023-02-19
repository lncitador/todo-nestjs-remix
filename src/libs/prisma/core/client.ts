import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
