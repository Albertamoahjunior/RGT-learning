import { Router } from 'express';
import controller from '../controllers/authControllers';

const router = Router();


//auth routes
router.post('/register', controller.add_user);
router.post('/login', controller.login);
router.get('/refresh_token', controller.refresh_token);
router.get('/logout', controller.logout);


export default router;
