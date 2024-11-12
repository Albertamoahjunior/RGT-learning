import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import Auth from '../services/auth';

const Login: React.FC = () =>{
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const navigate = useNavigate();

  const handleLogin = async () =>{
    //make api call to login on the backend to get token
    fetch('http://localhost:2000/tasks')
    .then((response)=>{
    console.log(response.status);
    })


    // const logged = await Auth.login(username, password);
    // //console.log(logged);
    // switch (logged) {
    //   case true:
    //     navigate('/');
    //     break;
    //   case false:
    //     alert('wrong credentials');
    //     break;
    //   default:
    //     alert('An error occured while trying to login')
    //     break;
    // }

  }

  return(
    <div className='login-background'>
    <h3>
    Welcome to <span style={{ color: '#0388fc' }}>TASKER </span>!
    </h3>
    <h4>Log In </h4>
      <div className='login'>
        <form onSubmit={handleLogin}>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username' required/>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' required/>
          <button type='submit'>log in</button>
        </form>
        <Link to='/register'>Not Registered? Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
