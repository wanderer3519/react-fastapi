import React, { useContext, useState } from 'react'

import ErrorMessage from './ErrorMessage'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // set error message
  const [error, setError] = useState('');
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(
        `grant_type=password&username=${email}&password=${password}&scope=&client_id=string&client_secret=string`
      )
    }

    const response = await fetch('/api/token', requestOptions);
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
    submitLogin();
  }

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>

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



        <ErrorMessage message={error} />
        <br />
        <button className="button is-primary" type='submit'>
          Login
        </button>

      </form>
    </div>
  )
}

export default Login