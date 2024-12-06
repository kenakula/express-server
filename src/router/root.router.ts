import { RootController } from '@controller/root.controller';
import express from 'express';

const router = express.Router();
const { getRootData } = new RootController();

router.get('/', getRootData);

export const rootRouter = router;
