export abstract class ILogger {
  public abstract debug(message: string, context?: string): void;
  public abstract log(message: string, context?: string): void;
  public abstract error(
    message: string,
    trace?: string,
    context?: string,
  ): void;
  public abstract warn(cmessage: string, context?: string): void;
  public abstract verbose(message: string, context?: string): void;
  public abstract setContext(context: string): void;
}
