import React from 'react';
import PropTypes from 'prop-types';

import { FaFlag, FaPhone } from 'react-icons/fa';
import { IoIosBook } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'

import style from './style.module.css';

const GuideDescription = (props) => {
  const {placeOfOrigin, description, phone, email, name} = props;

  const getFirstName = () => {
    if (!name)
      return 'the guide';

    const spaceIndex = name.indexOf(' ');

    if (spaceIndex === -1)
      return name;
    else
      return name.substr(0, spaceIndex);
  };

  return(
    <div className={`${style.container} ${props.className} scrollbar1`}>
      <h1>A little about {getFirstName()}</h1>
      <p>
        <span><FaFlag size={20} /> <strong>Place of origin:</strong></span> &nbsp;
        <span>{placeOfOrigin}</span>
      </p>
      <p>
        <span><IoIosBook size={25} /> <strong>Story:</strong></span> &nbsp;
        {description}
      </p>
      <p>
        <span><FaPhone size={20} /> <strong>Phone:</strong></span> &nbsp;
        <span><a href={`tel:${email}`} >{phone}</a></span>
      </p>
      <p>
        <span><MdEmail size={25} /> <strong>Email:</strong></span> &nbsp;
        <span><a href={`mailto:${email}`} target='_bank' >{email}</a></span>
      </p>
    </div>
  );
}

GuideDescription.propTypes = {
  placeOfOrigin: PropTypes.string,
  description: PropTypes.string,
  phone: PropTypes.string,
  name: PropTypes.string
}

GuideDescription.defaultProps = {
  placeOfOrigin: 'Mars',
  description: '...',
  phone: '...',
  name: ''
}

export default GuideDescription;
