import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { timeStarted } from 'src/main';
import { MyLoggerService } from 'src/utils/logger-service/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: MyLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl } = req;
      const { statusCode, statusMessage } = res;
      const message = `[HTTP] ${method} ${statusCode} ${originalUrl} MESSAGE: ${statusMessage} ${
        Date.now() - timeStarted
      }ms`;

      if (statusCode >= 500) {
        return this.loggerService.error(message);
      }

      if (statusCode >= 400) {
        return this.loggerService.warn(message);
      }

      return this.loggerService.log(message);
    });

    next();
  }
}
