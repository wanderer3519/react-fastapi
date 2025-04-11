import React, { useContext, useEffect } from 'react';

import Register from './components/Register';
import Header from './components/Header';
import Login from './components/Login';
import { UserContext } from './context/UserContext';
import Table from './components/Table';

const App = () => {
  const [message, setMessage] = React.useState('Hello World!');
  const [token] = useContext(UserContext);
  
  const getWelcomeMessage = async () => {
    const requestOptions = {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api', requestOptions);
    const data = await response.json();

    if(!response.ok) {
      console.log('Something messed up');
    }
    else{
      setMessage(data.message);
    }

    // console.log(data);
  };


  useEffect(() => {
    getWelcomeMessage();
  }, []);


  return (
    <>
      <Header title={message} />

      <div className="columns">
        <div className='column'></div>
        <div className='column m-5 is-two-thirds'>
          {
            !token ? (
              <div className="columns">
                <Register/> <Login/>
              </div>
            ) : (
              <Table/>
            )
          }
        </div>
        <div className='column'></div>
      </div>
    </>
  );
}

export default App;
