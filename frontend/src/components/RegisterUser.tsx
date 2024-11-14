import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';
import Auth from '../services/auth';

const RegisterUser: React.FC = () =>{
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpassword, setCpassword] = useState<string>('');

  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent) =>{
    e.preventDefault();
    //make api call to register on the backend to get token
    if(password !== cpassword){
      alert('Passwords are not the same');
    }else{

      const registered = await Auth.register(username, password);

      switch (registered.state) {
        case true:
          localStorage.setItem('tasker-access-token', registered.token ?? '');
          localStorage.setItem('user-id', registered.userId ?? '');
          localStorage.setItem('username', registered.username ?? '');
          navigate('/');
          break;
        case false:
          alert('such a user already exists');
          break;
        default:
          alert('An error occured trying to register user')
          break;
      }

    }
  }

  return(
    <div className='register-background '>
      <h3>
      New to <span style={{ color: '#0388fc' }}>TASKER</span>?
      Sign Up
      </h3>
      <div className='register'>
        <form onSubmit={handleRegister}>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username' required/>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' required />
          <input type='password' value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder='Confirm Password' required/>

          <button type='submit'>sign up</button>
        </form>
        <Link to='/login'>Already Registered? log in</Link>
      </div>
    </div>
  );
}

export default RegisterUser;
