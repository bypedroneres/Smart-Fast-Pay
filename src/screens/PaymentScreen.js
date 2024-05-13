import React from 'react'
import Transaction from '../components/Transaction'
import Navbar from '../components/Navbar'

function PaymentScreen() {
  return (
    <div className='payment'>
        <div className='payment_Dashboard'>
        <Transaction/>
        <Navbar/>
        </div>
    </div>
  )
}

export default PaymentScreen
