import {Request, Response} from 'express';
import {Task} from './models';
import {get_tasks, get_task_db, add_task_db, delete_task_db, update_task_db, update_complete, update_unfinish} from './db'

//function to get all tasks
async function get_all_tasks(_req:Request, res:Response) :Promise<void>{
  try {
      let tasks: Task[] | undefined = await get_tasks();

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
}

//function to get a task by id
async function get_task(req:Request, res:Response) :Promise<void>{
  try {
    const id:number | undefined = req.params['id'] ? parseInt(req.params['id']) : undefined;

    if(!id){
      res.status(400).json({message:'bad requests no id number found', data: {}});
      return;
    }

    let task : Task | undefined = await get_task_db(id);

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
    const {id, title, task} = req.body;

    if(!task){
      res.status(400).json({message:'bad request no task information body found', data: {}});
      return;
    }else{
      const new_task: Task | undefined = await add_task_db(id, title, task);
      console.log(new_task);
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

    const {title, task} = taskUpdate;
    const result = await update_task_db(id, title, task);
    console.log(result);
    res.status(200).json({message:'task updated successfully', data:{}});
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

    if(!id){
      res.status(400).json({message:'bad request no task id submitted', data:{}});
      return;
    }

    const del = await delete_task_db(id);
    console.log(del);
    res.status(200).json({message:'task deleted successfully', data:{}});
    return;

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


    if(!id){
      res.status(400).json({message:'no task id found', data:{}});
      return;
    }

    //find the task
    let task: Task | undefined = await get_task_db(id);

    if(task){
      let result = await update_complete(id);
      console.log(result);
      res.status(200).json({message:'task updated successfully', data:{}});
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


    if(!id){
      res.status(400).json({message:'no task id found', data:{}});
      return;
    }

    //find the task
    let task: Task | undefined = await get_task_db(id);

    if(task){
      let result = await update_unfinish(id);
      console.log(result);
      res.status(200).json({message:'task updated successfully', data:{}});
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
