import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {FaPlus, FaSignOutAlt} from 'react-icons/fa';
import EditTask from "./edittask";
import NewTask from './newtask';
import { Task } from '../models/task';
import TaskTab from './tasktab';
import '../styles/taskcontainer.css';
import axios from 'axios';
import { ThemeContext } from "../context/themeContext";
import Auth from '../services/auth';
import TaskService from '../services/tasks';

//create a dummy task todo
const dummy : Task = {
  id: 1,
  title: 'dummy',
  task: 'dummy',
  date: new Date().toLocaleDateString(),
  complete: false,
}

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [editVisibility, setEditVisibility] = useState<boolean>(false);
  const [prevTask, setPrevTask] = useState<Task>(dummy);

  const {theme, changeTheme} = useContext(ThemeContext);
  const navigate = useNavigate();



  useEffect(()=>{
    const fetch_tasks = async ()  => {
        const fetched = await TaskService.fetchTasks();

        if(fetched !== null){
          setTasks(fetched);
        }else{
          alert('An error occured trying to fetch tasks');
        }
    }

    fetch_tasks();
  },[tasks]);

  //function to handdle adding of new tasks
  const handleAddTask = async (newTask: Task) => {
    const added = await TaskService.addTask(newTask);
    if(added){
      setTasks((prevTasks) => ({...prevTasks, ...added}));
    }else if(added === null){
      alert('An error occured trying to add task');
    }else{
      alert('Same task already exists')
    }
  };

 //set up screen to edit tasks
  const setUpEdit = (task: Task) =>{
    setPrevTask(task);
    setEditVisibility(true);
  }

//function to edit tasks
  const handleEditTask = async (task: Task) => {
    const edited = await TaskService.editTask(task);
    if(edited){
      setTasks(prevTasks => prevTasks.filter(ptask => ptask.id !== task.id));
      setTasks(prevTasks => ({...prevTasks, ...edited}));
    }
  }

//function to delete tasks
  const deleteTask = async (taskId: number) => {
    const deleted = await TaskService.deleteTask(taskId);
    if(deleted){
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }else if(null){
      alert('An error occured trying to delete tasks');
    }else{
      alert('Task not existence');
    }
  };


  //function to log out
  const handleLogOut = async () =>{
    //call auth service to carry out the operation
    const loggedOut = await Auth.logout();
    if(loggedOut){
      Auth.logout();
      navigate('/login');
    }
  }

  return (
      <div className='task-container'>

        <button className='log-out' onClick={handleLogOut} ><FaSignOutAlt/></button>
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
