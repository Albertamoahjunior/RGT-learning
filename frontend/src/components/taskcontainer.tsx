import React, { useState, useEffect, useContext } from "react";
import {FaPlus} from 'react-icons/fa';
import EditTask from "./edittask";
import NewTask from './newtask';
import { Task } from '../models/task';
import TaskTab from './tasktab';
import '../styles/taskcontainer.css'
import axios from 'axios';
import { ThemeContext } from "../context/themeContext";

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

  const {theme, changeTheme} = useContext(ThemeContext);



  useEffect(()=>{
    const fetch_tasks = async ()  => {
      try {
        let response = await axios.get('http://localhost:2000/tasks');
        if (response.status === 200){
          setTasks(response.data.data);
        }else{
          setTasks([]);
        }
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
      if(response.data.data){
        newTask = response.data.data;
        //and then effect it in the frontend
        setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the list
        alert('task added successfully')
      }else{
        throw new Error("database error");

      }

    } catch (error) {
      console.log(error);
      alert('Could not add task');
    }

  };

  const setUpEdit = (task: Task) =>{
    setPrevTask(task);
    setEditVisibility(true);
  }

  const handleEditTask = async (task: Task) => {
    //first make the api call to make changes to the back
    try {
      const response = await axios.put(`http://localhost:2000/tasks/task/${task.id}`, task);

      if(response.data.data.rowCount){
        setTasks(prevTasks => prevTasks.filter(old_task => old_task.id !== task.id));
        setTasks(prevTasks => [...prevTasks, task]);
        alert(response.data.message);
      }else{
        throw new Error('database error');
      }

    } catch (error) {
      console.log(error);
      alert('Could not edit task')
    }
  }

  const deleteTask = async (taskId: number) => {
    //make call to make changes in the back
    try {
      let response = await axios.delete(`http://localhost:2000/tasks/task/${taskId}`)

      //effect change in the front when everything is successful
      if(response.data.data.rowCount){
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        alert(response.data.message);
      }else{
        throw new Error('database error');
      }
    } catch (error) {
      console.log(error);
      alert('Could not delete task');
    }
  };

  return (
      <div className='task-container'>


        <button className='switch-btn' onClick={changeTheme}
        style={{backgroundColor: theme === 'light' ? '#222936' : 'white',
        color: theme === 'light'? 'white' : 'black' }}>{theme === 'light'? 'dark' : 'light'}</button>
          <div className='top-bar'>
            <h1>Tasks</h1>
            <button className='add-btn' onClick={()=> setVisibility(true)}><FaPlus/></button>
          </div>
          <div className='content'>
              {tasks.length >= 1 ? (
                tasks.map((task: any, index: any) => (
                  <TaskTab
                    task={task}
                    key={task.id || index}
                    onDelete={deleteTask}
                    onEdit={setUpEdit}
                  />
                ))
              ) : (
                <p>No tasks yet</p>
              )}
            <NewTask isVisible={visibility} onAddTask={handleAddTask} setVisible={setVisibility} taskNumber={Math.round(Math.random() *10000) + 1}/>
            {editVisibility && <EditTask isVisible={editVisibility} onEditTask={handleEditTask} setVisible={setEditVisibility} prevTask={prevTask}/>}
          </div>
      </div>
  );
}

export default TaskContainer;
