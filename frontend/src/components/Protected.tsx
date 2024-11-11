import React from "react";
import {Navigate} from 'react-router-dom';

interface ProtectedProps{
  children: React.ReactElement;
}

const Protected :React.FC<ProtectedProps> = ({children}) =>{
  if(localStorage.getItem('tasker-access-token')){
    return children;
  }else{
    return <Navigate to='/login'/>;
  }
}

export default Protected;
