import React, { useContext, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../Header'
import { AuthContext } from '../../context/auth';

import style from './style.module.css';

const LoginPage = () => {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({
		email: '',
		password: ''
	});

  const [error, setError] = useState(false);

  const passwordField = useRef(null);

  const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })

  const handleError = () => {
    passwordField.current.value = null;
    setError(true);
  }

  const handleSubmit = async event => {
		event.preventDefault();
    setError(false);

    try {
      await authContext.login(state.email, state.password);

    } catch (e) {
      handleError();
    }
	}

  return (
    <div className='fadeIn'>
      {authContext.loggedInGuide && <Redirect to='/profile' />}
      <Header light={false} />
      <div className={style.container}>
        <h1>Log In as Guide</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className={style.error}>The email address or password you entered is invalid.</p> }
          <input name='email' type='text' onChange={handleChange} placeholder='Email' />
          <input name='password' type='password' onChange={handleChange} placeholder='Password' ref={passwordField} />

          <input name='login' type='submit' value='Login' />
          <a href='mailto:travinality@info.com' target='_blank'>Want to join? Contact us</a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
