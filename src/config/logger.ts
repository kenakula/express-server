import pino from 'pino-http';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }

    return 'info';
  }
});
