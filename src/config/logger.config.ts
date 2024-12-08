import { IncomingMessage, ServerResponse } from 'node:http';

import { TLogLevel } from '@app/types';
import pino, { HttpLogger } from 'pino-http';

export const createLogger  = (level: string): HttpLogger<IncomingMessage, ServerResponse, TLogLevel> => pino({
  level,
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
