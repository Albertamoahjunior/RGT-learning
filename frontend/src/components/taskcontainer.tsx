import React, { useState, useEffect } from "react";
import EditTask from "./edittask";
import NewTask from './newtask';
import { Task } from '../models/task';
import TaskTab from './tasktab';
import '../styles/taskcontainer.css'
import axios from 'axios';

//create a dummy task todo
const dummy : Task = {
  id: 1,
  title: 'dummy',
  task: 'dummy',
  date: new Date().toLocaleDateString(),
  complete: false
}

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [editVisibility, setEditVisibility] = useState<boolean>(false);
  const [prevTask, setPrevTask] = useState<Task>(dummy);

  useEffect(()=>{
    const fetch_tasks = async ()  => {
      try {
        let response = await axios.get('http://localhost:2000/tasks');
        setTasks(response.data.data);
      } catch (error) {
        console.log(error);
        alert('Could not fetch tasks');
      }
    }

    fetch_tasks();
  },[]);

  const handleAddTask = async (newTask: Task) => {
    //first make the call to add task in the back
    try {
      const response = await axios.post('http://localhost:2000/tasks/task', newTask);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert('Could not add task');
    }

    //and then effect it in the frontend
    setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the list
  };

  const setUpEdit = (task: Task) =>{
    setPrevTask(task);
    setEditVisibility(true);
  }

  const handleEditTask = async (task: Task) => {
    //first make the api call to make changes to the back
    try {
      const response = await axios.put(`http://localhost:2000/tasks/task/${task.id}`, task);
      alert(response.data.message);

    } catch (error) {
      console.log(error);
      alert('Could not edit task')
    }

    //and then make it reflect on the front end
    setTasks(prevTasks => prevTasks.filter(old_task => old_task.id !== task.id));
    setTasks(prevTasks => [...prevTasks, task]);
  }

  const deleteTask = async (taskId: number) => {
    //make call to make changes in the back
    try {
      let response = await axios.delete(`http://localhost:2000/tasks/task/${taskId}`)
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert('Could not delete task');
    }

    //effect change in the front when everything is successful
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className='task-container'>
        <div className='top-bar'>
          <h1>Task List</h1>
          <button onClick={()=> setVisibility(true)}>Add New Task</button>
        </div>
        <div className='content'>
          {tasks.map(task => <TaskTab task={task} key={task.id} onDelete={deleteTask} onEdit={setUpEdit}/>)}
          <NewTask isVisible={visibility} onAddTask={handleAddTask} setVisible={setVisibility} taskNumber={Math.round(Math.random())}/>
          {editVisibility && <EditTask isVisible={editVisibility} onEditTask={handleEditTask} setVisible={setEditVisibility} prevTask={prevTask}/>}
        </div>
    </div>
  );
}

export default TaskContainer;
