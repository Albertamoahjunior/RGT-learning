import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskContainer from './components/taskcontainer';

function App() {
  return (
    <div className="App">
    <h1>TASKER</h1>
      <TaskContainer/>
    </div>
  );
}

export default App;
