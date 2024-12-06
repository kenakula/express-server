import { RootController } from '@controller/root.controller';
import { Router } from 'express';

const router = Router();
const { getRootData } = new RootController();

router.get('/', getRootData);

export const rootRouter = router;
