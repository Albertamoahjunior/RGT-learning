import {Request, Response} from 'express';
import {Task} from './models';
import {general_read_file, general_write_file, file_exist} from './db'

//function to get all tasks
async function get_all_tasks(_req:Request, res:Response) :Promise<void>{
  try {
    if(await file_exist()){
      let tasks: Task[] = await general_read_file();

      if(!tasks){
        res.status(404).json({message: 'no tasks found', data: {}})
        return;
      }else{
        res.status(200).json({message: 'All tasks', data: tasks})
        return;
      }
    }else{
      res.status(404).json({message: 'no tasks found', data: {}})
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
    let tasks: Task[] = await general_read_file();

    if(!id){
      res.status(400).json({message:'bad requests no id number found', data: {}});
      return;
    }

    let task = tasks.find(task => task.id === id);

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
    const task :Task = req.body;

    if(!task){
      res.status(400).json({message:'bad request no task information body found', data: {}});
      return;
    }
    //try to read file if it exists first before writing to it
    if(!await file_exist()){
      await general_write_file([task]);
      res.status(201).json({message:'task added successfully' , data:{}});
      return;
    }else{
      let tasks :Task[] = await general_read_file();

      let exist = tasks.find(extask => extask.id === task.id);

      if(!exist){
        tasks.push(task);

        await general_write_file(tasks);
        res.status(201).json({message:'task added successfully' , data:{}});
        return;
      }else{
        res.status(400).json({message:'task already exist' , data:{}});
        return;
      }
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
    let tasks: Task[] = await general_read_file();
    const task: Task = req.body;

    if(!task || !id){
      res.status(400).json({message:'no task information found', data:{}});
      return;
    }

    //take out old task information
    tasks = tasks.filter(task => task.id !== id);

    tasks.push(task);

    //write new file with updated tasks information
    await general_write_file(tasks);
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
    let tasks: Task[] = await general_read_file();

    if(!id){
      res.status(400).json({message:'bad request no user id submitted', data:{}});
      return;
    }

    tasks = tasks.filter(task => task.id !== id);

  //write new file with updated tasks information(removing the specified task)
    await general_write_file(tasks);
    res.status(200).json({message:'user information deleted successfully', data:{}});
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
    let tasks: Task[] = await general_read_file();


    if(!id){
      res.status(400).json({message:'no task id found', data:{}});
      return;
    }

    //find the task
    let task: Task | undefined = tasks.find(task => task.id === id);

    if(task){
      //take out old task information
      tasks = tasks.filter(task => task.id !== id);

      //update the task
      task['complete'] = true;

      tasks.push(task);

      //write new file with updated tasks information
      await general_write_file(tasks);
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
    let tasks: Task[] = await general_read_file();


    if(!id){
      res.status(400).json({message:'no task id found', data:{}});
      return;
    }

    //find the task
    let task: Task | undefined = tasks.find(task => task.id === id);

    if(task){
      //take out old task information
      tasks = tasks.filter(task => task.id !== id);

      //update the task
      task['complete'] = false;

      tasks.push(task);

      //write new file with updated tasks information
      await general_write_file(tasks);
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
