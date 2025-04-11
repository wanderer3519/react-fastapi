import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import ErrorMessage from './ErrorMessage';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [, setToken] = useContext(UserContext);


  const submitRegistration = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, hashed_password: password })
    }

    const response = await fetch('/api/users', requestOptions);
    const data = await response.json();

    if(!response.ok) {
      setError(data.detail); 
    }
    else{
      setToken(data.access_token);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === confirmPassword && password.length > 5) {
      submitRegistration();
      return;
    }
    
    setError('Ensure passwords match and are at least 6 characters long');
  }

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Register</h1>
        
        <div className="field">
          <label className="label">Email address</label>
          <div className="control">
            <input
              type="email"
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input'
              required
            />
          </div>
        </div>


        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder='Enter password'
              value={password}
              onChange={(p) => setPassword(p.target.value)}
              className='input'
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input 
              type="password" 
              placeholder='Confirm password' 
              value={confirmPassword} 
              onChange={(cp) => setConfirmPassword(cp.target.value)} 
              className='input'
              required
            />
          </div>
        </div>

        <ErrorMessage message={error} />
        <br />
        <button className="button is-primary" type='submit'>
          Register
        </button>

      </form>
    </div>
  )
}

export default Register