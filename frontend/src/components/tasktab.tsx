import React, {useState} from 'react';
import {Task} from '../models/task';
import '../styles/tasktab.css'

const TaskTab :React.FC<{task: Task; onDelete :(taskId : number) => void}>= (props) =>{
  const [complete, setComplete] = useState<boolean>(false);

  return(
    <div className='task-tab'>
      <button className='edit-button'> Edit </button>
      <p>{props.task.title}</p>
      <div className='desc-area'>
        <p>{props.task.task}</p>
      </div>
      <p>{props.task.date}</p>
      <button className='comp-button' onClick={()=> setComplete(!complete)}>{complete? 'done': 'unfinished'}</button>
      <button className='del-button' onClick={()=> props.onDelete(props.task.id)}>del</button>
    </div>
  );
}


export default TaskTab;
