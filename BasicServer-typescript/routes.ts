import { Router } from 'express';
import controller from './controllers';

const router = Router();

//get all users
router.get('/', controller.get_all_users);

//get user by id
router.get('/user/:id', controller.get_user);

//add new user
router.post('/user', controller.add_user);

//delete user
router.delete('/user/:id', controller.delete_user);

//update user information
router.put('/user/:id', controller.update_user);

//edit user information
router.patch('/user', controller.edit_user);


export default router;
