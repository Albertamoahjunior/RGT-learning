import axios from 'axios';
import { Task } from '../models/task';
import Auth from  './auth';

const API_SERVICE = process.env.REACT_APP_API_URL;
const OPTIONS = {
  headers:{
    'Authorization': localStorage.getItem('tasker-access-token')
  }
}

//fetch all tasks
const fetchTasks = async () :Promise<boolean | null | undefined | Task> =>{
  try {
    let response = await axios.get(`http://${API_SERVICE}/tasks`, OPTIONS);
    //take care of the case where token is invalid or not available
    switch (response.status) {
      case 200:
        return response.data.data as Task;
      case 400:
      case 401:
          //logic to use refresh token
          const refresh = await Auth.refresh();
          if(refresh){
            return await fetchTasks();
          }else{
            return undefined;
          }

      default:
        return false;

    }
  } catch (error) {
    return null;
  }
}

//add new tasks
const addTask = async (task: Task) :Promise<boolean | null | undefined | Task> =>{
  //first make the call to add task in the back
  try {
    const response = await axios.post(`http://${API_SERVICE}/tasks/task`, task, OPTIONS);
    //take care of the case where token is invalid or not available
    switch (response.status) {
      case 200:
        return response.data.data as Task;
      case 400:
      case 401:
          //logic to use refresh token
          const refresh = await Auth.refresh();
          if(refresh){
            return await addTask(task);
          }else{
            return undefined;
          }

      default:
        return false;

    }
  } catch (error) {
    return null;
  }
}

//edit task
const editTask = async (task : Task) :Promise<boolean | null | undefined | Task> =>{
  //first make the api call to make changes to the back
  try {
    const response = await axios.put(`http://${API_SERVICE}/tasks/task/${task.id}`, task, OPTIONS);

    //take care of the case where token is invalid or not available
    switch (response.status) {
      case 200:
        return response.data.data as Task;
      case 400:
      case 401:
          //logic to use refresh token
          const refresh = await Auth.refresh();
          if(refresh){
            return await editTask(task);
          }else{
            return undefined;
          }

      default:
        return false;

    }

  } catch (error) {
    return null
  }
}

//delete task
const deleteTask = async (taskId : number) :Promise<boolean | null | undefined> =>{
  //make call to make changes in the back
  try {
    let response = await axios.delete(`http://localhost:2000/tasks/task/${taskId}`, OPTIONS)

    //take care of the case where token is invalid or not available
    switch (response.status) {
      case 200:
        return response.data.data.rowCount ? true : false;
      case 400:
      case 401:
          //logic to use refresh token
          const refresh = await Auth.refresh();
          if(refresh){
            return await deleteTask(taskId);
          }else{
            return undefined;
          }

      default:
        return false;
    }
  } catch (error) {
    return null;
  }
}

//complete task
const completeTask = async (taskId: number) :Promise<boolean | null | undefined> =>{
  try {
    let response = await axios.patch(`http://${API_SERVICE}/tasks/task/${taskId}/unfinish`, OPTIONS);

    //take care of the case where token is invalid or not available
    switch (response.status) {
      case 200:
        return response.data.data.rowCount ? true : false;

      case 400:
      case 401:
        //logic to use refresh token
        const refresh = await Auth.refresh();
        if(refresh){
          return await completeTask(taskId);
        }else{
          return undefined;
        }

      default:
        return false;
    }
  } catch (error) {
      return null;
  }
}

//mark as unfinished
const unfinishTask = async (taskId : number) :Promise<boolean | null | undefined> =>{
  try {
    let response = await axios.patch(`http://${API_SERVICE}/tasks/task/${taskId}/complete`, OPTIONS);
    //take care of the case where token is invalid or not available
    switch (response.status) {
      case 200:
        return response.data.data.rowCount ? true : false;

      case 400:
      case 401:
          //logic to use refresh token
          const refresh = await Auth.refresh();
          if(refresh){
            return await unfinishTask(taskId);
          }else{
            return undefined;
          }

      default:
        return false;
    }
  } catch (error) {
      return null;
  }
}

const taskService = {
  fetchTasks,
  addTask,
  editTask,
  deleteTask,
  completeTask,
  unfinishTask
}

export default taskService;
