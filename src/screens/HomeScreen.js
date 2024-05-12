import React from 'react'
import Profile from '../components/Profile';
import Balance from '../components/Balance';

function HomeScreen() {
  return (
    <div className='home'>
        <div className='home_Dashboard'>
        <Profile/>
        <Balance/>
        </div>
      
    </div>
  )
}

export default HomeScreen
