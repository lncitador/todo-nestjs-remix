import { Module } from '@nestjs/common';
import { RemixModule } from '~/app/remix.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { EncryptPasswordModule } from './services/encrypt-password/encrypt-password.module';
import { LoggerModule } from './services/logger/logger.module';

@Module({
  imports: [LoggerModule, PrismaModule, EncryptPasswordModule, RemixModule],
})
export class InfrastructureModule {}
