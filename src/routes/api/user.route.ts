import { Router } from 'express';
import { ProductController } from '../../controllers/user.controller';
import passport from 'passport';
import { verifyUser } from '../../config/authentication';
import { verifyAdmin, verifyOwnAction } from '../../middlewares/user.middleware';

const router = Router();

router.get('/', verifyUser, ProductController.listAllUsers);

router.get('/:id', verifyUser, ProductController.getOneUser)

router.post('/login', passport.authenticate('local'), ProductController.login);

router.post('/signup', ProductController.register);

router.put('/:id', verifyUser, verifyAdmin, ProductController.editUser);

router.put('/editProfile/:id', verifyUser, verifyOwnAction, ProductController.editUser);

export default router;