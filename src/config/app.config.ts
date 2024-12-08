import * as http from 'node:http';

import { TAppController, TLogLevel } from '@app/types';
import { RootController } from '@controller/root.controller';
import { UserController } from '@controller/user.controller';
import { errorMiddleware } from '@middleware/error.middleware';
import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import { AddressInfo } from 'net';
import { Logger } from 'pino';

import { createLogger } from './logger.config';

export class AppConfig {
  private readonly _app: Application;
  private readonly _port = process.env.SERVER_PORT || '5000';
  private readonly _host = process.env.SERVER_HOST || 'localhost';
  private readonly _logLevel = process.env.LOG_LEVEL ?? 'error';
  private readonly _basePath = '/api';
  private readonly _logger = createLogger(this._logLevel);
  private readonly _controllers: TAppController[];

  constructor() {
    this._app = express();

    this._controllers = [
      {
        controller: new RootController(),
        path: '',
      },
      {
        controller: new UserController(),
        path: 'users',
      }
    ];

    this.initMiddlewares();
    this.initControllers();
    this.initErrorHandlers();
  }

  public get app(): Application {
    return this._app;
  }

  public get logger(): Logger<TLogLevel, boolean> {
    return this._logger.logger;
  }

  public listen(): void {
    const server = http.createServer(this._app);

    server.listen({ port: this._port, host: this._host }, () => {
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

  private initControllers(): void {
    this._controllers.forEach(({ controller: { router }, path }) => {
      this._app.use(`${this._basePath}/${path}`, router);
    });
  }

  private initErrorHandlers(): void {
    this._app.use(errorMiddleware);
  }
}
