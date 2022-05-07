import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import Header from '../Header';
import GuideProfile from '../GuidePage/Profile';

import style from './style.module.css';

const ProfilePage = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className='fadeIn'>
      {!authContext.loggedInGuide && <Redirect to='/' />}
      <Header light={true} />
      <div className={style.topContainer}>
        <h1>Your profile</h1>
        <p>Signed in as: {authContext.loggedInGuide && authContext.loggedInGuide.name}</p>
        <input type='button' onClick={authContext.logout} value='Logout' />
        <h1>Preview of your profile</h1>
      </div>
      <GuideProfile guide={authContext.loggedInGuide} />
    </div>
  );
}

export default ProfilePage;
