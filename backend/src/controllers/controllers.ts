import {Request, Response} from 'express';
import {Task} from '../models';
import {get_tasks, get_task_db, add_task_db, delete_task_db,
  update_task_db, update_complete, update_unfinish } from '../db';


//function to get all tasks
async function get_all_tasks(req:Request, res:Response) :Promise<void>{
  const user_id:number  | undefined = req.params['user'] ? parseInt(req.params['user']) : undefined;

  if(user_id){
    try {
        let tasks: Task[] | undefined = await get_tasks(user_id);

        if(!tasks){
          res.status(404).json({message: 'no tasks found', data: {}})
          return;
        }else{
          res.status(200).json({message: 'All tasks', data: tasks})
          return;
        }

    } catch (error) {
      console.log(error);
      res.status(500).json({message:'server error', data: error});
      return;
    }
  }else{
    res.status(400).json({message: 'no user id appended'})
    return;
  }
}

//function to get a task by id
async function get_task(req:Request, res:Response) :Promise<void>{
  try {
    const id:number | undefined = req.params['id'] ? parseInt(req.params['id']) : undefined;
    const user_id:number  | undefined = req.query['user'] ? parseInt(req.query['user'] as string) : undefined;

    if(!id || !user_id){
      res.status(400).json({message:'bad requests no id number found', data: {}});
      return;
    }

    console.log({id: id, user: user_id});

    let task : Task | undefined = await get_task_db(id, user_id);

    if(task){
      res.status(200).json({message: 'task found', data: task});
      return;
    }else{
      res.status(404).json({message: 'task not found', data:{}});
      return;
    }
  } catch (error) {
    res.status(500).json({message:'server error', data: error});
    return;
  }
}

//function to add new task
async function add_task(req:Request, res:Response) :Promise<void>{
  try {
    const {title, task, user_id} = req.body;

    if(!task){
      res.status(400).json({message:'bad request no task information body found', data: {}});
      return;
    }else{
      const new_task: Task | undefined = await add_task_db(title, task, user_id);
      res.status(200).json({message: 'new task added successfully', data:new_task})
    }

  } catch (error) {
    res.status(500).json({message:'server error', data: error});
    return;
  }

}

//function to update task information
async function update_task(req:Request, res:Response) :Promise<void>{
  //check if user exists
  try {
    const id:number  | undefined = req.params['id'] ? parseInt(req.params['id']) : undefined;
    const taskUpdate: Task = req.body;

    if(!taskUpdate || !id){
      res.status(400).json({message:'no task information found', data:{}});
      return;
    }

    const {title, task, user_id} = taskUpdate;
    const result = await update_task_db(id, title, task, user_id);
    console.log(result);
    res.status(200).json({message:'task updated successfully', data:result});
    return;

  } catch (error) {
    res.status(500).json({message:'Cannot update file' , data:error});
    return;
  }
}

//function to delete task
async function delete_task(req:Request, res:Response) :Promise<void>{
  //check if task exists
  try {
    const id:number  | undefined = req.params['id'] ? parseInt(req.params['id']) : undefined;
    const user_id:number  | undefined = req.query['user'] ? parseInt(req.query['user'] as string) : undefined;

    if(!id || !user_id){
      res.status(400).json({message:'bad request no task id submitted', data:{}});
      return;
    }

    const del = await delete_task_db(id, user_id);
    if(del && del.rowCount){
      res.status(200).json({message:'task deleted successfully', data: del ? del.rowCount: null});
      return;
    }else{
      res.status(404).json({message:'task deleted task does not exist', data: del? del.rowCount : null});
      return;
    }


  } catch (error) {
    res.status(500).json({message:'Cannot update file', data:error});
    return;
  }

}

//function to mark tasks complete
async function complete_task (req: Request, res: Response) : Promise<void>{
  //check if task exists
  try {
    const id:number  | undefined = req.params['id'] ? parseInt(req.params['id']) : undefined;
    const user_id:number  | undefined = req.query['user'] ? parseInt(req.query['user'] as string ) : undefined;


    if(!id || !user_id){
      res.status(400).json({message:'no task id found', data:{}});
      return;
    }

    //find the task
    let task: Task | undefined = await get_task_db(id, user_id);

    if(task){
      let result = await update_complete(id, user_id);
      console.log(result);
      res.status(200).json({message:'task updated successfully', data:result});
      return;
    }else{
      res.status(404).json({message:'task not found', data:{}});
      return;
    }

  } catch (error) {
    res.status(500).json({message:'Cannot update file' , data:error});
    return;
  }
}

//function to mark tasks unfinished
async function unfinish_task (req: Request, res: Response) : Promise<void>{
  //check if task exists
  try {
    const id:number  | undefined = req.params['id'] ? parseInt(req.params['id']) : undefined;
    const user_id:number  | undefined = req.query['user'] ? parseInt(req.query['user'] as string) : undefined;


    if(!id || !user_id){
      res.status(400).json({message:'no task id found', data:{}});
      return;
    }

    //find the task
    let task: Task | undefined = await get_task_db(id, user_id);

    if(task){
      let result = await update_unfinish(id, user_id);
      console.log(result);
      res.status(200).json({message:'task updated successfully', data:result});
      return;
    }else{
      res.status(404).json({message:'task not found', data:{}});
      return;
    }

  } catch (error) {
    res.status(500).json({message:'Cannot update file' , data:error});
    return;
  }
}

//export all functions to be used throughout the file
export default{
  get_all_tasks,
  get_task,
  add_task,
  update_task,
  delete_task,
  complete_task,
  unfinish_task
}
