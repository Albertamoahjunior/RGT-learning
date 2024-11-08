import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';

const RegisterUser: React.FC = () =>{
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpassword, setCpassword] = useState<string>('');

  const navigate = useNavigate();
  const handleRegister = () =>{
    console.log('logged in')
    navigate('/')
  }

  return(
    <div className='register-background '>
      <h3>
      New to <span style={{ color: '#0388fc' }}>TASKER</span>? 
      Sign Up
      </h3>
      <div className='register'>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username'/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
        <input type='password' value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder='Confirm Password'/>

        <button onClick={handleRegister}>sign up</button>
        <Link to='/login'>Already Registered? log in</Link>
      </div>
    </div>
  );
}

export default RegisterUser;
