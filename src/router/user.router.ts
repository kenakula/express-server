import { UserController } from '@controller/user.controller';
import { Router } from 'express';

const router = Router();
const controller = new UserController();

router.get('/users', controller.getAllUsers);
router.post('/users', controller.createUser);

export const userRouter = router;
