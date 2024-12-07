import { UserEntity } from '@app/entities/user.entity';
import { UserController } from '@controller/user.controller';
import { validationMiddleware } from '@middleware/validation.middleware';
import { Router } from 'express';

const router = Router();
const controller = new UserController();

router.get('/', controller.getAllUsers);
router.post('/', validationMiddleware(UserEntity), controller.createUser);

export const userRouter = router;
