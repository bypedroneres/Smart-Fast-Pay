import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../firebase';
import "../components/AuthForm.css"

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged in user:', user.email); // Access the email property
        navigate('/');
      } else {
        console.log('No user logged in');
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError(null);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError(null);
      alert('User logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className='auth_Form'>
      <h2>Welcome</h2>
      <form>
        <div className='auth_Input'>
          <input
            type='email'
            placeholder='E-mail'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='auth_Input'>
          <input
            type='password'
            placeholder='Password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='auth_Buttons'>
          <button type='submit' onClick={handleRegister}>Register</button>
          <button type='submit' onClick={handleLogin}>Login</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AuthForm;
