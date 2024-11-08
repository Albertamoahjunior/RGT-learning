import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import TaskContainer from './components/taskcontainer';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import { ThemeContextType, AuthContextType, Token  } from './context/types';
import { ThemeContext } from './context/themeContext';
import { AuthContext } from './context/AuthContext'

function App() {
  const [theme, setTheme] = useState<string>('light');
  const [token, setToken] = useState<Token | undefined>(undefined);

  const changeTheme = () =>{
    setTheme((currTheme) => currTheme === 'light' ? 'dark' : 'light');
  }

  const updateToken = (token: Token) =>{
    setToken(() => setToken(token));
  }

  let themeParam : ThemeContextType = {
    theme,
    changeTheme
  };

  let authParam : AuthContextType = {
    token,
    updateToken
  };

  return (
    <ThemeContext.Provider value={themeParam}>
      <AuthContext.Provider value={authParam}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<RegisterUser/>}/>
            <Route path='/' element={<TaskContainer/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
