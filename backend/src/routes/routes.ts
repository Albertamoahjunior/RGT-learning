import { Router } from 'express';
import controller from '../controllers/controllers';
import authenticate from '../controllers/authControllers';


const router = Router();


//get all tasks
router.get('/:user', authenticate.authenticate, controller.get_all_tasks);

//get task by id
router.get('/task/:id', authenticate.authenticate, controller.get_task);

//add new task
router.post('/task',  authenticate.authenticate, controller.add_task);

//delete task
router.delete('/task/:id', authenticate.authenticate, controller.delete_task);

//update task information
router.put('/task/:id', authenticate.authenticate, controller.update_task);

//mark as complete
router.patch('/task/:id/complete', authenticate.authenticate, controller.complete_task);

//mark as unfinish
router.patch('/task/:id/unfinish', authenticate.authenticate, controller.unfinish_task);



export default router;
