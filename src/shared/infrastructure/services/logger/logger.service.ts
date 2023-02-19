import { Injectable, Logger, Scope } from '@nestjs/common';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger implements ILogger {
  public setContext(context: string): void {
    this.context = context;
  }

  public override debug(message: string, context?: string) {
    // if (process.env.NODE_ENV !== 'production') {
    //     !!context ? super.debug(message, context) : super.debug(message);
    // }

    !!context ? super.debug(message, context) : super.debug(message);
  }

  public override log(message: string, context?: string) {
    !!context ? super.log(message, context) : super.log(message);
  }

  public override error(message: string, trace?: string, context?: string) {
    !!context
      ? super.error(message, trace, context)
      : super.error(message, trace);
  }

  public override warn(message: string, context?: string) {
    !!context ? super.warn(message, context) : super.warn(message);
  }

  public override verbose(message: string, context?: string) {
    // if (process.env.NODE_ENV !== 'production') {
    //     !!context
    //         ? super.verbose(message, context)
    //         : super.verbose(message);
    // }

    !!context ? super.verbose(message, context) : super.verbose(message);
  }
}
