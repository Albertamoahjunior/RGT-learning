import React, { useState } from "react";
import { Task } from "../models/task";
import '../styles/newtask.css';

// Define the interface for  a call back function
interface NewTaskProps {
  onAddTask: (task: Task) => void;  // Callback to send task outside the component
  isVisible: boolean;
  setVisible: (isVisible:boolean) => void;
  taskNumber: number;
}

const NewTask: React.FC<NewTaskProps> = ({ onAddTask, isVisible, setVisible, taskNumber }) => {
  const [title, setTitle] = useState<string>('');
  const [task, setTask] = useState<string>('');

  // Create the new_task object
  const new_task: Task = {
    title: title,
    task: task,
    date: new Date().toLocaleDateString(),
    id: taskNumber,
    complete: false,
  };

  const handleSubmit = () => {
    if(title === ' ' || task === ''){
      alert('empty fields');
    }else{
      onAddTask(new_task); // Send the new_task to the parent component
      setTitle(''); // Clear the input fields after submitting
      setTask('');
      setVisible(false);
    }
  };

  return (
    <div className={`component ${isVisible? 'visible': ''}`}>
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
