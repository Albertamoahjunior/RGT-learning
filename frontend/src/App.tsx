import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TaskContainer from './components/taskcontainer';
import { ThemeContextType } from './context/types';
import { ThemeContext } from './context/themeContext'

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
      <div className="App" style={{backgroundColor: theme === 'light'? 'white' : '#222936',
        color: theme === 'light'? 'black' : 'white'
      }}>
         <h1>TASKER</h1>
          <TaskContainer/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
