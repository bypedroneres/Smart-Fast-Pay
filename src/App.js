import React from 'react';
import './App.css';
import './theme/variables.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';

function App() {
  return (
    <div className="App">
      <div className='App_Dashboard'>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
