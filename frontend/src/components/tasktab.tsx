import React, {useState} from 'react';
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
      <button onClick={()=> props.onEdit(props.task)} className='edit-button'> Edit </button>
      <p>{props.task.title}</p>
      <div className='desc-area'>
        <p>{props.task.task}</p>
      </div>
      <p>{props.task.date}</p>
      <button className='comp-button' onClick={mark}>{complete? 'complete': 'unfinished'}</button>
      <button className='del-button' onClick={()=> props.onDelete(props.task.id)}>del</button>
    </div>
  );
}


export default TaskTab;
