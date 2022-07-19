import React, { useState } from 'react';
import Alert from '../../Alert';
import { serverUrl } from '../../utils';

const Signup = ({ changeUserStatus, modifyAlert }) => {

  const [username, setUsername] = useState('');
  const [confirmPassword1, setConfirmPassword1] = useState('');
  const [confirmPassword2, setConfirmPassword2] = useState('');
  const [alert, setAlert] = useState({
    isShowing: false,
    msg: ''
  });

  const handleSignupSubmit = async (evt) => {
    evt.preventDefault();
    
    if (username && confirmPassword1 && confirmPassword2) {
      
      if (confirmPassword1 === confirmPassword2) {
        
        const resp = await fetch(serverUrl + '/signup', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password: confirmPassword2})
        });

        const status = await resp.json();

        if (status === 'success') {
          changeUserStatus('homepage', true, username);
        }
        else {
          setAlert({isShowing: true, msg: status});
        }
      }
      else {
        setAlert({isShowing: true, msg: "passwords don't match"});
      } 
    } 
    else {
      // username and password confirmation have empty strings
      setAlert({isShowing: true, msg: "please enter valid account info"});
    }
  }

  return (
    <>
      <div className="nav-links">
        <button onClick={() => changeUserStatus()}>back</button>
      </div>
      <article>
        <form className='form' onSubmit={handleSignupSubmit}>
          {alert.isShowing && <Alert {...alert} removeAlert={() => setAlert({isShowing: false, msg: ''})} />}
          <div className='form-control'>
            <label htmlFor='username'>Enter Username </label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Enter Password </label>
            <input
              type='text'
              id='password'
              name='password'
              value={confirmPassword1}
              onChange={(evt) => setConfirmPassword1(evt.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Confirm Password </label>
            <input
              type='text'
              id='password'
              name='password'
              value={confirmPassword2}
              onChange={(evt) => setConfirmPassword2(evt.target.value)}
            />
          </div>
          <button type='submit'>sign up</button>
        </form>
      </article>
    </>
  );
};

export default Signup;
