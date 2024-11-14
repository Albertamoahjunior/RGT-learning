import React, {useState, useContext} from 'react';
import {FaTrash, FaCheckCircle, FaClock, FaEdit} from 'react-icons/fa'
import {Task} from '../models/task';
import '../styles/tasktab.css';
import { ThemeContext } from "../context/themeContext";
import { format, parseISO } from 'date-fns';
import useTaskService from '../services/tasks';
import { useAuthContext } from "../context/authContext";

interface taskProps {
  task: Task;
  onDelete :(taskId : number) => void;
  onEdit :(task: Task) => void
}

const TaskTab :React.FC<taskProps>= (props) =>{
  const [complete, setComplete] = useState<boolean>(props.task.complete);

  let {theme, changeTheme} = useContext(ThemeContext);
  let { authParcel } = useAuthContext();
  const {completeTask, unfinishTask} = useTaskService();


  const mark = async () => {
    try {
      let updatedComplete = complete
        ? await completeTask(props.task.id)  // Undo complete
        : await unfinishTask(props.task.id); // Mark as complete


      if (updatedComplete) {
        setComplete(!complete);  // Toggle the state only if operation was successful
        alert(`task marked as ${complete ? 'undone' : 'done'}`);
      } else {
        alert('task does not exist');
      }
    } catch (error) {
      alert('An error occurred while marking the task');
    }
  };


  return(
    <div className='task-tab' style={{color: theme === 'light' ? 'black' : 'black'}}>
      <button onClick={()=> props.onEdit(props.task)} className='edit-button'> <FaEdit/> </button>
      <h3>{props.task.title}</h3>
      <div className='desc-area'>
        <p>{props.task.task}</p>
      </div>
      <p>Date created: { (props.task.date.includes('T'))? format(parseISO(props.task.date), 'MM/dd/yyyy'): props.task.date}</p>
      <button className={complete? 'comp-btn' : 'unfi-btn'} onClick={mark}>{complete? <FaCheckCircle/> : <FaClock/> }</button>
      <button className='del-button' onClick={()=> props.onDelete(props.task.id)}><FaTrash/></button>
    </div>
  );
}


export default TaskTab;
