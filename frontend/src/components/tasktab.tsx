import React, {useState, useContext, useEffect} from 'react';
import {FaTrash, FaCheckCircle, FaClock, FaCog} from 'react-icons/fa'
import {Task} from '../models/task';
import '../styles/tasktab.css';
import { ThemeContext } from "../context/themeContext";
import { format, parseISO } from 'date-fns';
import TaskService from '../services/tasks';

interface taskProps {
  task: Task;
  onDelete :(taskId : number) => void;
  onEdit :(task: Task) => void
}

const TaskTab :React.FC<taskProps>= (props) =>{
  const [complete, setComplete] = useState<boolean>(props.task.complete);

  let {theme, changeTheme} = useContext(ThemeContext);


  const mark = async () =>{
    //take the state of completeness and then switch them
      if(complete) {
        let unfinish = await TaskService.completeTask(props.task.id);
        if(unfinish){
          setComplete(!complete);
          alert('task marked as undone')
        }else if(null){
          alert('error occured while marking task');
        }else{
          alert('task does not exist')
        }
      }else{
        let complete = await TaskService.unfinishTask(props.task.id);
        if(complete){
          setComplete(!complete);
          alert('task marked as done')
        }else if(null){
          alert('error occured while marking task');
        }else{
          alert('task does not exist')
        }
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
