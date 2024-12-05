import { getRootData } from '@controller/root.controller';
import express from 'express';

const router = express.Router();

router.get('/', getRootData);

export const rootRouter = router;
