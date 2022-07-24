import React, { useState } from 'react';
import Alert from '../ui/Alert';
import { serverUrl } from '../../utils'

const Login = ({ changeUserStatus }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    isShowing: false,
    msg: ''
  });

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();

    if (username && password) {
      const resp = await fetch(serverUrl + '/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      });

      const status = await resp.json();

      if (status === 'success') {
        changeUserStatus('feed', true, username);
      } else {
        setAlert({isShowing: true, msg: status});
      }
    } 
    else {
      setAlert({isShowing: true, msg: 'please enter login info'});
    }
  };

  return (
    <>
      <div className="nav-links">
        <button onClick={() => changeUserStatus('signup')}>sign up</button>
      </div>
      <article>
        <form className='form' onSubmit={handleLoginSubmit}>
          {alert.isShowing && <Alert {...alert} removeAlert={() => setAlert({isShowing: false, msg: ''})} />}
          <div className='form-control'>
            <label htmlFor='username'>Username : </label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Password : </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <button type='submit'>Log In</button>
        </form>
      </article>
    </>
  );
};

export default Login;
