import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import '../components/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email); // Set the user's email when the user is logged in
      } else {
        setUserEmail(''); // Reset the user's email when no user is logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='profile'>
      <div className='profile_Content'>
        <div className='profile_Header'>
          <div className='profile_Pic'></div>
          <div className='profile_Info'>
            <p>Hello, <br></br>{userEmail}</p>
          </div>
        </div>
        <div className='profile_Balance'>
          <p>Total balance</p>
          <h1>$24.000</h1>
        </div>
            <div className='profile_Buttons'>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className='profile_Transactions'>
                <div className='profile_Transaction'>
                    <p>Airbnb</p>
                    <p>-$18.00</p>
                </div>
                <div className='profile_Transaction'>
                    <p>Rent</p>
                    <p>-$120.00</p>
                </div>
                <div className='profile_Transaction'>
                    <p>Spotify</p>
                    <p>-$38.00</p>
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Profile
