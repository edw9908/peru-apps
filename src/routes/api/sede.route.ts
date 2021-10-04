import { Router } from 'express';
import { SedeController } from '../../controllers/sede.controller';

const router = Router();

router.get('/', SedeController.getAllSedes);

export default router;