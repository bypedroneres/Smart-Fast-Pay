import React from 'react'
import Profile from '../components/Profile';
import Balance from '../components/Balance';
import Navbar from '../components/Navbar';

function HomeScreen() {
  return (
    <div className='home'>
        <div className='home_Dashboard'>
        <Profile/>
        <Balance/>
        </div>
        <Navbar/>
      
    </div>
  )
}

export default HomeScreen
