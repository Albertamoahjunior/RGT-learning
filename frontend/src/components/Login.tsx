import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

const Login: React.FC = () =>{
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const navigate = useNavigate();

  const handleLogin = () =>{
    console.log('logged in')
    navigate('/home');
  }

  return(
    <div className='login-background'>
    <h3>
    Welcome to <span style={{ color: '#0388fc' }}>TASKER </span>!
    </h3>
    <h4>Log In </h4>
      <div className='login'>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username'/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
        <button onClick={handleLogin}>log in</button>
        <Link to='/register'>Not Registered? Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
