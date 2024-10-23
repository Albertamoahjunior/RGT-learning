import React, { useState } from "react";
import NewTask from './newtask';
import { Task } from '../models/task';
import TaskTab from './tasktab'

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the list
  };

  const deleteTask = (taskId: number) => {
  setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map(task => <TaskTab task={task} key={task.id} onDelete={deleteTask}/>)}
      <button>Add New Task</button>
    </div>
  );
}

export default TaskContainer;
