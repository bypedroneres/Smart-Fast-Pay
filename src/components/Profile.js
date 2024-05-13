import React, { useState, useEffect } from 'react';
import db, { auth } from '../firebase';
import { Link } from 'react-router-dom';
import '../components/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail(user.email);

        // Fetch user balance
        const userId = user.uid;
        const userDocRef = db.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        
        if (userDoc.exists) {
          setBalance(userDoc.data().balance || 1000);
        } else {
          console.error('User document not found, creating a new one...');
          // Create a new user document with default data
          await userDocRef.set({ balance: 1000 }); // Assuming balance starts from 0
          setBalance(0);
        }
      } else {
        setUserEmail('');
        setBalance(0);
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
            <p>Hello, <br/>{userEmail}</p>
          </div>
        </div>
        <div className='profile_Balance'>
          <p>Total balance</p>
          <h1>${balance}</h1>
        </div>
            <div className='profile_Buttons'>
                <Link to='/payment' className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Link>
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

