import { PrismaModule as Prisma } from '~/libs/prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    Prisma.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        prismaOptions: {
          log: ['query', 'info', 'warn'],
        },
      }),
      inject: [],
    }),
  ],
})
export class PrismaModule {}
