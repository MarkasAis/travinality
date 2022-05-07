import React from 'react';
import PropTypes from 'prop-types';

import { FaBug } from 'react-icons/fa';

import style from './style.module.css';

const defaultBackground = '/banner_bg.jpg';

const BugReport = (props) => {
  return (
    <a href='mailto:travinality@info.com?subject=Feedback / Bug Report&body=I would like to share some feedback about' target='_blank' className={style.container}>
      <FaBug size={30} />
    </a>
  );
}

export default BugReport;
