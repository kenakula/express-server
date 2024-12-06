import { UserController } from '@controller/user.controller';
import { Router } from 'express';

const router = Router();
const controller = new UserController();

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);

export const userRouter = router;
