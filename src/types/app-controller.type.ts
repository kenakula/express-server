import { BaseController } from '@controller/base.controller';
import { ObjectLiteral } from 'typeorm';

export type TAppController = {
  controller: BaseController<ObjectLiteral>;
  path: string;
};
