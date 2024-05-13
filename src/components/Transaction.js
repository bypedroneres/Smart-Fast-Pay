import React, { useState } from 'react';
import '../components/Transaction.css';

function Transaction() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [moeda, setMoeda] = useState('');
  const [data, setData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
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

    console.log('Transaction data:', {
      descricao,
      valor,
      moeda,
      data
    });

    setDescricao('');
    setValor('');
    setMoeda('');
    setData('');
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-black)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
            <p>Send</p>
            </button>
        </form>
      </div>
    </div>
  );
}

export default Transaction;
