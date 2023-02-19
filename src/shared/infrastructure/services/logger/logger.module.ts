import { Module, Provider } from '@nestjs/common';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';

import { LoggerService } from './logger.service';

const provider: Provider = {
  provide: ILogger,
  useClass: LoggerService,
};

@Module({
  providers: [provider],
  exports: [provider],
})
export class LoggerModule {}
