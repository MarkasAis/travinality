import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { GuideContext } from '../../context';

import Header from '../Header';
import GuideProfile from './Profile';

import style from './style.module.css';

// The GuidePage component
const GuidePage = (props) => {
  // Acquires the GuideContext which manages all Guide requests to our API
  const context = useContext(GuideContext);

  // Extract the ID attribute from the PROPS property
  const { id } = props;

  // Initialize a component state attribute indicating whether the user should be redirected
  const [redirect, setRedirect] = useState(false);

  // This function runs at the start, whenever the component is first mounted to the DOM
  useEffect(() => {
    loadGuide();
  }, []);

  // Loads the guide profile information
  const loadGuide = async() => {
    await context.getGuide(id);
  }

  // Error handling if the user was not found
  const resolveNotFound = () => {
    setRedirect(true);
    context.setError(false);
  }

  // Returns a React element that will be rendered to the DOM
  return (
    <div className='fadeIn'>
      {redirect ? <Redirect to='/' /> :
      context.error && resolveNotFound()}
      <Header light={true} />
      <GuideProfile guide={context.guide} className={style.profile} />
    </div>
  );
}

GuidePage.propTypes = {
  id: PropTypes.number
}

export default GuidePage;
