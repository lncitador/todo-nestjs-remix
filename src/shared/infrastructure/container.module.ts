import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { LoggerModule } from './services/logger/logger.module';
import { LoggerService } from './services/logger/logger.service';

@Module({
  imports: [LoggerModule, PrismaModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class InfrastructureModule {}
