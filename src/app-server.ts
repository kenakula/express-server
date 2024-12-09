import * as http from 'node:http';
import { IncomingMessage, ServerResponse } from 'node:http';

import { TController, TLogLevel } from '@app/types';
import { appConfig } from '@config/app.config';
import { createLogger } from '@config/logger.config';
import { AuthController } from '@controller/auth.controller';
import { RootController } from '@controller/root.controller';
import { UserController } from '@controller/user.controller';
import { errorMiddleware } from '@middleware/error.middleware';
import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import { AddressInfo } from 'net';
import { Logger } from 'pino';
import { HttpLogger } from 'pino-http';
import { ObjectLiteral } from 'typeorm';

export class AppServer {
  private readonly _serverConfig = appConfig.server;
  private readonly _app: Application;
  private readonly _basePath = '/api';
  private readonly _logger: HttpLogger<IncomingMessage, ServerResponse, TLogLevel>;
  private readonly _controllers: TController<ObjectLiteral>[];

  constructor() {
    this._app = express();
    this._logger = createLogger(this._serverConfig.logLevel);
    this._controllers = [new RootController(), new UserController(), new AuthController()];

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
    const { port, host } = this._serverConfig;

    server.listen({ port, host }, () => {
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
    this._controllers.forEach(({ router, path }) => {
      this._app.use(`${this._basePath}/${path}`, router);
    });
  }

  private initErrorHandlers(): void {
    this._app.use(errorMiddleware);
  }
}
