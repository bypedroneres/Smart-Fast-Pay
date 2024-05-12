import React from 'react';
import './App.css';
import './theme/variables.css'
import Profile from './components/Profile';
import Balance from './components/Balance';

function App() {
  return (
    <div className="App">
      <div className='App_Dashboard'>
      <Profile/>
      <Balance/>
      </div>
    </div>
  );
}

export default App;
