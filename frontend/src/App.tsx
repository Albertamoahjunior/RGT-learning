import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import TaskContainer from './components/taskcontainer';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import Protected from './components/Protected';
import { ThemeContextType } from './context/types';
import { ThemeContext } from './context/themeContext';

function App() {
  const [theme, setTheme] = useState<string>('light');

  const changeTheme = () =>{
    setTheme((currTheme) => currTheme === 'light' ? 'dark' : 'light');
  }

  let themeParam : ThemeContextType = {
    theme,
    changeTheme
  };

  return (
    <ThemeContext.Provider value={themeParam}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<RegisterUser/>}/>
            <Route path='/' element={<Protected><TaskContainer/></Protected>}/>
          </Routes>
        </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
