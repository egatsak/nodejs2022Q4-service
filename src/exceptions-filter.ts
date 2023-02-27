import {
  ExceptionFilter,
  Catch,
  HttpStatus,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { MyLoggerService } from './utils/logger-service/logger.service';

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private loggerService: MyLoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { httpAdapter } = this.httpAdapterHost;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
    };

    if (httpStatus >= 500) {
      this.loggerService.error(
        (exception as Error).message,
        (exception as Error).stack,
      );
    } else if (httpStatus >= 400) {
      this.loggerService.warn((exception as Error).message);
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
