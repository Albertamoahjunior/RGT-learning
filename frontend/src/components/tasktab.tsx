import React, {useState} from 'react';
import {FaTrash, FaCheckCircle, FaClock, FaCog} from 'react-icons/fa'
import {Task} from '../models/task';
import '../styles/tasktab.css';
import axios from 'axios';

const TaskTab :React.FC<{task: Task; onDelete :(taskId : number) => void; onEdit :(task: Task) => void}>= (props) =>{
  const [complete, setComplete] = useState<boolean>(props.task.complete);


  const mark = async () =>{
      setComplete(!complete);
    try {
      if(complete) {
        let response = await axios.patch(`http://localhost:2000/tasks/task/${props.task.id}/unfinish`);
        alert(response.data.message);
      }else{
        let response = await axios.patch(`http://localhost:2000/tasks/task/${props.task.id}/complete`);
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert('error could not mark');
    }
  }


  return(
    <div className='task-tab'>
      <button onClick={()=> props.onEdit(props.task)} className='edit-button'> <FaCog/> </button>
      <h3>{props.task.title}</h3>
      <div className='desc-area'>
        <p>{props.task.task}</p>
      </div>
      <p>Date created: {props.task.date}</p>
      <button className={complete? 'comp-btn' : 'unfi-btn'} onClick={mark}>{complete? <FaCheckCircle/> : <FaClock/> }</button>
      <button className='del-button' onClick={()=> props.onDelete(props.task.id)}><FaTrash/></button>
    </div>
  );
}


export default TaskTab;
