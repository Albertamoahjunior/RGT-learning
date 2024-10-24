import React, { useState } from "react";
import NewTask from './newtask';
import EditTask from "./edittask";
import { Task } from '../models/task';
import TaskTab from './tasktab';
import '../styles/taskcontainer.css'

//dummy task
const dummy_task : Task = {
  id: 1,
  title: 'dummy',
  task: 'dummy',
  date: 'dummy',
  complete: false
}

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [editVisibility, setEditVisibility] = useState<boolean>(false);
  const [prevTask, setPrevTask] = useState<Task>(dummy_task);

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the list
  };

  const setUpEdit = (task: Task) =>{
    setEditVisibility(true);
    console.log(task)
    setPrevTask(task);
  }

  const handleEditTask = (editedTask: Task) =>{
    //delete previous task
    setTasks(prevTasks => prevTasks.filter(task => task.id !== editedTask.id));

    setTasks(prevTasks => [...prevTasks, editedTask]);
  }

  const deleteTask = (taskId: number) => {
  setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className='task-container'>
      <h1>Task List</h1>
      <button onClick={()=> setVisibility(true)}>Add New Task</button>
      {tasks.map(task => <TaskTab task={task} key={task.id} onDelete={deleteTask} onEdit={setUpEdit}/>)}
      <NewTask isVisible={visibility} onAddTask={handleAddTask} setVisible={setVisibility}/>
      <EditTask isVisible={editVisibility} onEditTask={handleEditTask} setVisible={setEditVisibility} prevTask={prevTask}/>
    </div>
  );
}

export default TaskContainer;
