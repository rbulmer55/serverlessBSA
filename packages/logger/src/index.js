import { createLogger, format, transports } from 'winston';

let winstonLogger = null;

export function initLogger(service, level = 'info', additionalTransports = []) {
  let transport = [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.simple(),
        format.colorize()
      ),
    }),
  ];

  if (additionalTransports.length) {
    transport = transport.concat(additionalTransports);
  }

  if (!winstonLogger) {
    winstonLogger = createLogger({
      level,
      format: format.combine(
        format.timestamp(),
        format.simple(),
        format.json()
      ),
      defaultMeta: { service },
      transports: transport,
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
