import React, { useState, useEffect } from "react";
import EditTask from "./edittask";
import NewTask from './newtask';
import { Task } from '../models/task';
import TaskTab from './tasktab';
import '../styles/taskcontainer.css'

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


  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the list
  };

  const setUpEdit = (task: Task) =>{
    setPrevTask(task);
    setEditVisibility(true);
  }

  const handleEditTask = (task: Task) => {
    setTasks(prevTasks => prevTasks.filter(old_task => old_task.id !== task.id));

    setTasks(prevTasks => [...prevTasks, task]);
  }

  const deleteTask = (taskId: number) => {
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
          <NewTask isVisible={visibility} onAddTask={handleAddTask} setVisible={setVisibility} taskNumber={tasks.length + 1}/>
          {editVisibility && <EditTask isVisible={editVisibility} onEditTask={handleEditTask} setVisible={setEditVisibility} prevTask={prevTask}/>}
        </div>
    </div>
  );
}

export default TaskContainer;
