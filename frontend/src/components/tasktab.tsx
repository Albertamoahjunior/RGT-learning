import React, {useState, useContext} from 'react';
import {FaTrash, FaCheckCircle, FaClock, FaCog} from 'react-icons/fa'
import {Task} from '../models/task';
import '../styles/tasktab.css';
import axios from 'axios';
import { ThemeContext } from "../context/themeContext";
import { format, parseISO } from 'date-fns';

interface taskProps {
  task: Task;
  onDelete :(taskId : number) => void;
  onEdit :(task: Task) => void
}

const TaskTab :React.FC<taskProps>= (props) =>{
  const [complete, setComplete] = useState<boolean>(props.task.complete);

  let {theme, changeTheme} = useContext(ThemeContext);

  const mark = async () =>{
      setComplete(!complete);
    try {
      if(complete) {
        let response = await axios.patch(`http://localhost:2000/tasks/task/${props.task.id}/unfinish`);
        if(response.data.data.rowCount){
          alert(response.data.message);
        }else{
          setComplete(!complete);
          throw new Error('database error');
          alert('could not mark task');
        }
      }else{
        let response = await axios.patch(`http://localhost:2000/tasks/task/${props.task.id}/complete`);
        if(response.data.data.rowCount){
          alert(response.data.message);
        }else{
          setComplete(!complete);
          throw new Error('database error');
          alert('could not mark task');
        }
      }
    } catch (error) {
      console.log(error);
      alert('error could not mark');
    }
  }


  return(
    <div className='task-tab' style={{color: theme === 'light' ? 'black' : 'black'}}>
      <button onClick={()=> props.onEdit(props.task)} className='edit-button'> <FaCog/> </button>
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
