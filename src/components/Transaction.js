import React, { useState } from 'react';
import db, { auth } from '../firebase';
import '../components/Transaction.css';

function Transaction() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [moeda, setMoeda] = useState('');
  const [data, setData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valor || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
      setErrorMessage('Por favor, insira um valor válido.');
      return;
    }

    if (!moeda) {
      setErrorMessage('Por favor, selecione uma moeda.');
      return;
    }

    if (!data) {
      setErrorMessage('Por favor, selecione uma data.');
      return;
    }

    setErrorMessage('');

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const transactionData = {
          descricao,
          amount: parseFloat(valor),
          moeda,
          date: new Date(data),
          userId
        };
        await db.collection('transactions').add(transactionData);
        console.log('Transaction successfully added to Firestore:', transactionData);
        setDescricao('');
        setValor('');
        setMoeda('');
        setData('');
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
            <input placeholder='Ammount' type="number" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} />
          </div>
          <div className="form-group">
            <input placeholder='Description' type="text" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="form-group">
            <select id="moeda" value={moeda} onChange={(e) => setMoeda(e.target.value)}>
              <option value="">Selecione uma moeda</option>
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="form-group">
            <input placeholder='Date' type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} />
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
