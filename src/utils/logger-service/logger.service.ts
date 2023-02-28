import { Injectable, LoggerService } from '@nestjs/common';
import { LoggerToFileService } from './logger-to-file.service';

enum LoggingLevel {
  LOG = 'log',
  ERROR = 'error',
  WARN = 'warn',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

const LOGGING_LEVELS = [
  LoggingLevel.LOG,
  LoggingLevel.ERROR,
  LoggingLevel.WARN,
  LoggingLevel.DEBUG,
  LoggingLevel.VERBOSE,
];

export function getLoggingLevel(level: number): LoggingLevel[] {
  return LOGGING_LEVELS.slice(0, level);
}

// set it from 1 to 5
const DEFAULT_LVL_LOG = 3;

@Injectable()
export class MyLoggerService implements LoggerService {
  loggingLevels: LoggingLevel[];

  constructor(private loggerToFile: LoggerToFileService) {
    this.loggingLevels = getLoggingLevel(
      Number(process.env.LVL_LOG) || DEFAULT_LVL_LOG,
    );
  }

  async log(msg: string) {
    if (this.isLvlActive(LoggingLevel.LOG)) {
      const stringified = this.logToString(LoggingLevel.LOG, msg);
      await this.loggerToFile.write(stringified);
      console.log(stringified);
    }
  }

  async error(msg: string, ...optionalParams: any[]) {
    if (this.isLvlActive(LoggingLevel.ERROR)) {
      const stringified = this.logToString(
        LoggingLevel.ERROR,
        `${msg} ${optionalParams.join('')}`,
      );
      await this.loggerToFile.write(stringified);
      console.log(stringified);
    }
  }

  async warn(msg: string) {
    if (this.isLvlActive(LoggingLevel.WARN)) {
      const stringified = this.logToString(LoggingLevel.WARN, msg);
      await this.loggerToFile.write(stringified);
      console.log(stringified);
    }
  }

  async debug?(msg: string) {
    if (this.isLvlActive(LoggingLevel.DEBUG)) {
      const stringified = this.logToString(LoggingLevel.DEBUG, msg);
      await this.loggerToFile.write(stringified);
      console.log(stringified);
    }
  }

  async verbose?(msg: string) {
    if (this.isLvlActive(LoggingLevel.VERBOSE)) {
      const stringified = this.logToString(LoggingLevel.VERBOSE, msg);
      await this.loggerToFile.write(stringified);
      console.log(stringified);
    }
  }

  logToString(prefix: string, msg: string): string {
    return `${new Date().toISOString()} [${prefix}]: ${msg}`;
  }

  isLvlActive(level: LoggingLevel) {
    return this.loggingLevels.includes(level);
  }
}
