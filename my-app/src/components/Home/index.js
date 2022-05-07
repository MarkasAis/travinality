import React from 'react';

import Header from '../Header'
import FeaturedGuides from '../FeaturedGuides'

import style from './style.module.css';

const HomePage = () => {
  return (
    <div className='fadeIn'>
      <Header light={false} />
      <div className={style.container}>
        <FeaturedGuides />
      </div>
    </div>
  );
}

export default HomePage;
