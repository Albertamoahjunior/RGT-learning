import { Router } from 'express';
import controller from './controllers';

const router = Router();

//get all tasks
router.get('/', controller.get_all_tasks);

//get task by id
router.get('/task/:id', controller.get_task);

//add new task
router.post('/task', controller.add_task);

//delete task
router.delete('/task/:id', controller.delete_task);

//update task information
router.put('/task/:id', controller.update_task);

//mark as complete
router.patch('/task/:id/complete', controller.complete_task);

//mark as unfinish
router.patch('/task/:id/unfinish', controller.unfinish_task);



export default router;
