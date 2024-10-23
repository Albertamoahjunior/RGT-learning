import React, { useState } from "react";
import { Task } from "../models/task";

// Define the interface for  a call back function
interface NewTaskProps {
  onAddTask: (task: Task) => void;  // Callback to send task outside the component
}

const NewTask: React.FC<NewTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>('');
  const [task, setTask] = useState<string>('');

  // Create the new_task object
  const new_task: Task = {
    title: title,
    task: task,
    date: new Date().toString(),
    id: Math.random(),
    complete: false,
  };

  const handleSubmit = () => {
    onAddTask(new_task); // Send the new_task to the parent component
    setTitle(''); // Clear the input fields after submitting
    setTask('');
  };

  return (
    <div className='new-task'>
      <input value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder='Enter title for task'
      />
      <input value={task} onChange={(e) => setTask(e.target.value)}
        placeholder='Enter the description'
      />
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}

export default NewTask;
