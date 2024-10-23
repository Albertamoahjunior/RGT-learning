import React, {useState} from 'react';
import {Task} from '../models/task';

const TaskTab :React.FC<{task: Task; onDelete :(taskId : number) => void}>= (props) =>{
  const [complete, setComplete] = useState<boolean>(false);

  return(
    <div className='task-tab'>
      <p>{props.task.title}</p>
      <p>{props.task.task}</p>
      <p>{props.task.date}</p>
      <button onClick={()=> setComplete(!complete)}>{complete? 'done': 'unfinished'}</button>
      <button onClick={()=> props.onDelete(props.task.id)}>del</button>
    </div>
  );
}


export default TaskTab;
