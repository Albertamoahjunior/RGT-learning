import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {FaPlus, FaSignOutAlt} from 'react-icons/fa';
import EditTask from "./edittask";
import NewTask from './newtask';
import { Task } from '../models/task';
import TaskTab from './tasktab';
import '../styles/taskcontainer.css';
import { ThemeContext } from "../context/themeContext";
import Auth from '../services/auth';
import useTaskService from '../services/tasks';



//create a dummy task todo
const dummy : Task = {
  id: 1,
  title: 'dummy',
  task: 'dummy',
  date: new Date().toLocaleDateString(),
  complete: false,
  user_id: '0'
}

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [editVisibility, setEditVisibility] = useState<boolean>(false);
  const [prevTask, setPrevTask] = useState<Task>(dummy);
  const [refresh, setRefresh] = useState<boolean>(false);

  const {theme, changeTheme} = useContext(ThemeContext);
  let { fetchTasks, addTask, deleteTask, editTask } = useTaskService();

  const navigate = useNavigate();


  //function to log out
  const handleLogOut = async () =>{
    //call auth service to carry out the operation

    const loggedOut = await Auth.logout();
    if(loggedOut){
      localStorage.removeItem('tasker-access-token');
      Auth.logout();
      navigate('/login');
    }
  }

  useEffect(()=>{
    const fetch_tasks = async ()  => {
        const fetched = await fetchTasks();

        if(fetched){
          setTasks(fetched as any);
        }else if(fetched === null){
          alert('An error occured trying to fetch tasks');
        }
        else{
          alert('Session expired please login again');
          handleLogOut();
        }
    }

    fetch_tasks();
  },[refresh]);

  //function to handdle adding of new tasks
  const handleAddTask = async (newTask: Task) => {
    const added = await addTask(newTask);
    if(added){
      setTasks((prevTasks) => ({...prevTasks, ...added as Task}));
      setRefresh(!refresh);
    }else{
      alert('An error occured trying to add task');
    }
  };

 //set up screen to edit tasks
  const setUpEdit = (task: Task) =>{
    setPrevTask(task);
    setEditVisibility(true);
  }

//function to edit tasks
  const handleEditTask = async (task: Task) => {
    const edited = await editTask(task);
    if(edited){
      setTasks(prevTasks => prevTasks.filter(ptask => ptask.id !== task.id));
      setTasks(prevTasks => ({...prevTasks, ...edited as Task}));
    }else{
      alert('Error occured while trying to edit task');
    }
  }

//function to delete tasks
  const handleDeleteTask = async (taskId: number) => {
    const deleted = await deleteTask(taskId);
    if(deleted){
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }else if( deleted === null){
      alert('An error occured trying to delete tasks');
    }else if(deleted === undefined){
      alert('Session expired please login again');
      handleLogOut();
    }
    else{
      alert('Task not existence');
    }
  };


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
                    onDelete={handleDeleteTask}
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
