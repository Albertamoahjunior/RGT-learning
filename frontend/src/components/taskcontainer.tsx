import React, { useState } from "react";
import NewTask from './newtask';
import { Task } from '../models/task';
import TaskTab from './tasktab';
import '../styles/taskcontainer.css'

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the list
  };

  const deleteTask = (taskId: number) => {
  setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className='task-container'>
      <h1>Task List</h1>
      <button onClick={()=> setVisibility(true)}>Add New Task</button>
      {tasks.map(task => <TaskTab task={task} key={task.id} onDelete={deleteTask}/>)}
      <NewTask isVisible={visibility} onAddTask={handleAddTask} setVisible={setVisibility}/>
    </div>
  );
}

export default TaskContainer;
