import React, { useState, useEffect } from 'react';
import db, { auth } from '../firebase';
import { Link } from 'react-router-dom';
import '../components/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

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

        // Fetch user transactions
        const transactionsSnapshot = await db.collection('transactions').where('userId', '==', userId).get();
        const transactionsData = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(transactionsData);
      } else {
        setUserEmail('');
        setBalance(0);
        setTransactions([]);
      }
    });

    return () => unsubscribe();
  }, [balance]); // Include balance in the dependency array to update the component when balance changes

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
              <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to='/payment' className='profile_Button'>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to='/payment' className='profile_Button'>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to='/payment' className='profile_Button'>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className='profile_Transactions'>
          {transactions.map(transaction => (
            <div key={transaction.id} className='profile_Transaction'>
              <p>{transaction.description}</p>
              <p>${transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
