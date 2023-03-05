import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { PrivateLayoutBackend } from './server/private-layout.server';
import { PublicLayoutBackend } from './server/public-layout.server';
import { SetStoreBackend } from './server/set-store.server';
import { SetThemeBackend } from './server/set-theme.server';
import { EncryptPasswordModule } from './services/encrypt-password/encrypt-password.module';
import { LoggerModule } from './services/logger/logger.module';

@Module({
  imports: [LoggerModule, PrismaModule, EncryptPasswordModule],
  providers: [
    PrivateLayoutBackend,
    PublicLayoutBackend,
    SetStoreBackend,
    SetThemeBackend,
  ],
  exports: [
    PrivateLayoutBackend,
    PublicLayoutBackend,
    SetStoreBackend,
    SetThemeBackend,
  ],
})
export class InfrastructureModule {}
