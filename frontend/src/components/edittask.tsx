import React, { useState } from "react";
import { Task } from "../models/task";
import '../styles/edittask.css';

// Define the interface for  a call back function
interface EditTaskProps {
  onEditTask: (task: Task) => void;  // Callback to send task outside the component
  isVisible: boolean;
  setVisible: (isVisible:boolean) => void;
  prevTask: Task;
}

const EditTask: React.FC<EditTaskProps> = ({ onEditTask, isVisible, setVisible, prevTask }) => {
  const [title, setTitle] = useState<string>(prevTask.title);
  const [task, setTask] = useState<string>(prevTask.task);

  // Create the new_task object
  const new_task: Task = {
    title: title,
    task: task,
    date: prevTask.date,
    id: prevTask.id,
    complete: false,
  };

  const handleSubmit = () => {
    if(title === ' ' || task === ''){
      alert('empty fields');
    }else{
      onEditTask(new_task); // Send the new_task to the parent component
      setTitle(prevTask.title); // Clear the input fields after submitting
      setTask(prevTask.task);
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
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default EditTask;
