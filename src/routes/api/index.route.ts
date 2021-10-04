import { Router } from "express";
import userRouter from './user.route';
import sedeRouter from './sede.route';

const router = Router();

router.use('/user', userRouter);
router.use('/sede', sedeRouter);

export default router;