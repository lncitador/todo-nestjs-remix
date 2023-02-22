import { PrismaModule as Prisma } from '~/libs/prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    Prisma.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        prismaOptions: {
          log: ['warn'],
        },
      }),
    }),
  ],
})
export class PrismaModule {}
