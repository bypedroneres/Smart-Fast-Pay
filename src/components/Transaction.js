import React, { useState } from 'react';
import db, { auth } from '../firebase';
import '../components/Transaction.css';

function Transaction() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }

    if (!currency) {
      setErrorMessage('Please select a currency.');
      return;
    }

    if (!date) {
      setErrorMessage('Please select a date.');
      return;
    }

    setErrorMessage('');

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const transactionData = {
          description,
          amount: parseFloat(amount),
          currency,
          date: new Date(date),
          userId
        };
        // Deduct the transaction amount from user's balance
        await db.collection('transactions').add(transactionData);
        await db.collection('users').doc(userId).update({
          balance: db.FieldValue.increment(-parseFloat(amount)) // Deduct the amount from the user's balance
        });
        console.log('Transaction successfully added to Firestore:', transactionData);
        setDescription('');
        setAmount('');
        setCurrency('');
        setDate('');
      } else {
        console.error('Current user not found');
      }
    } catch (error) {
      console.error('Error adding transaction to Firestore:', error);
    }
  };

  return (
    <div className='transaction'>
      <div className='transaction_Content'>
        <p>Sending</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input placeholder='Amount' type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <input placeholder='Description' type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="">Select a currency</option>
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="form-group">
            <input placeholder='Date' type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-black)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Send</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transaction;
