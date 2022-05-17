import { LoggerService } from '@nestjs/common';

export class BasicLoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
      console.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log('[verbose]: ',message, ...optionalParams);
  }
}