import axios from 'axios';
import { Task } from '../models/task';

const API_SERVICE = process.env.REACT_APP_API_URL;

//fetch all tasks
const fetchTasks = async () =>{

  console.log(process.env.REACT_APP_API_URL)
  try {
    let response = await axios.get(`http://${API_SERVICE}/tasks`);
    if (response.status === 200){
      return response.data.data;
    }else{
      return;
    }
  } catch (error) {
    return null;
  }
}

//add new tasks
const addTask = async (task: Task) =>{
  //first make the call to add task in the back
  try {
    const response = await axios.post(`http://${API_SERVICE}/tasks/task`, task);
    if(response.data.data){
      return response.data.data;
    }else{
      return false;
    }

  } catch (error) {
    return null;
  }
}

//edit task
const editTask = async (task : Task) =>{
  //first make the api call to make changes to the back
  try {
    const response = await axios.put(`http://${API_SERVICE}/tasks/task/${task.id}`, task);

    if(response.data.data.rowCount){
      return response.data.message;
    }else{
      return false;
    }

  } catch (error) {
    return null
  }
}

//delete task
const deleteTask = async (taskId : number) =>{
  //make call to make changes in the back
  try {
    let response = await axios.delete(`http://localhost:2000/tasks/task/${taskId}`)

    //effect change in the front when everything is successful
    if(response.data.data.rowCount){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return null;
  }
}

//complete task
const completeTask = async () =>{

}

//mark as unfinished
const unfinishTask = async () =>{

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
