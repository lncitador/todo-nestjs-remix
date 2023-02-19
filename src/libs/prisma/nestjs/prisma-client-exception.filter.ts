import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

/**
 *
 * {@link PrismaClientExceptionFilter} handling {@link Prisma.PrismaClientKnownRequestError} exceptions.
 *
 * Error codes definition for Prisma Client (Query Engine)
 * https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2000':
        this.catchValueTooLong(exception, response);
        break;
      case 'P2002':
        this.catchUniqueConstraint(exception, response);
        break;
      case 'P2025':
        this.catchNotFound(exception, response);
        break;
      default:
        this.unhandledException(exception, response);
        break;
    }
  }

  /**
   * Catches P2000 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2000
   *
   * @param exception P2000
   * @param response 400 Bad Request
   */
  private catchValueTooLong(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.BAD_REQUEST;
    const message = this.cleanUpException(exception);

    this.logger.warn(message);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  /**
   * Catches P2002 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
   *
   * @param exception P2002
   * @param response 409 Conflict
   */
  private catchUniqueConstraint(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.CONFLICT;
    const message = this.cleanUpException(exception);

    this.logger.warn(message);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  /**
   * Catches P2025 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
   *
   * @param exception P2025
   * @param response 404 Not Found
   */
  private catchNotFound(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.NOT_FOUND;
    const message = this.cleanUpException(exception);

    this.logger.warn(message);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  private unhandledException(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.cleanUpException(exception);

    this.logger.warn(message);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  /**
   * Cleans up the exception message
   * @param exception
   * @returns string
   */
  private cleanUpException(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string {
    const targets = exception.meta?.target as string[];
    return `${exception.message} ${targets?.join(', ')}!`;
  }
}
