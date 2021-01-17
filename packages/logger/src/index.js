import { createLogger, format } from 'winston';

let winstonLogger = null;

export function initLogger(
  service,
  level = 'info'
) {
  if (!winstonLogger) {
    winstonLogger = createLogger({
      level,
      format: format.combine(
        format.timestamp(),
        format.simple(),
        format.json()
      ),
      defaultMeta: { service },
    });
  }

  return winstonLogger;
}

export const logger = {
  error: (message, ...args) => {
    if (!winstonLogger) {
      throw new Error('Logger must be created before use.');
    }

    winstonLogger.error(message, ...args);
  },
  info: (message, ...args) => {
    if (!winstonLogger) {
      throw new Error('Logger must be created before use.');
    }

    winstonLogger.info(message, ...args);
  },
  warn: (message, ...args) => {
    if (!winstonLogger) {
      throw new Error('Logger must be created before use.');
    }

    winstonLogger.warn(message, ...args);
  },
};
