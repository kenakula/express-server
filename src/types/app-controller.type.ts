import { ObjectLiteral } from 'typeorm';

import { TController } from './controller.type';

export type TAppController = {
  controller: TController<ObjectLiteral>
  path: string;
};
