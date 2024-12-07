import * as http from 'node:http';
import { IncomingMessage, ServerResponse } from 'node:http';

import { TLogLevels } from '@app/types';
import { errorMiddleware } from '@middleware/error.middleware';
import { healthCheckRouter } from '@router/health-check.router';
import { rootRouter } from '@router/root.router';
import { userRouter } from '@router/user.router';
import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import { AddressInfo } from 'net';
import { Logger } from 'pino';
import { HttpLogger } from 'pino-http';

export class AppConfig {
  private readonly _app: Application;

  constructor(
    private readonly _logger: HttpLogger<IncomingMessage, ServerResponse, TLogLevels>,
    private readonly port: string,
    private readonly host: string
  ) {
    this._app = express();

    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandlers();
  }

  public get app(): Application {
    return this._app;
  }

  public get logger(): Logger<TLogLevels, boolean> {
    return this._logger.logger;
  }

  public listen(): void {
    const server = http.createServer(this._app);

    server.listen({ port: this.port, host: this.host }, () => {
      const addressInfo = server.address() as AddressInfo;
      this._logger.logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port} 🚀`);
    });
  }

  private initMiddlewares(): void {
    this._app.use(this._logger);
    this._app.use(urlencoded({ extended: true }));
    this._app.use(cors());
    this._app.use(helmet());
    this._app.use(json());
  }

  private initRouters(): void {
    this._app.use('/health', healthCheckRouter);
    this._app.use('/users', userRouter);
    this._app.use('/', rootRouter);
  }

  private initErrorHandlers(): void {
    this._app.use(errorMiddleware);
  }
}
