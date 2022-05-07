import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.module.css'

const ButtonLink = (props) => {
  const { to } = props;

  return (
    <Link className={`${props.className} ${style.link}`} to={to}>
        {props.children}
    </Link>
  );
}

ButtonLink.propTypes = {
  to: PropTypes.string
}

ButtonLink.defaultProps = {
	to: '#'
}

export default ButtonLink;
