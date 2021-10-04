import { Router } from 'express';
import apiRouter from './api/index.route';

const router = Router();

router.use('/api', apiRouter)

export default router;