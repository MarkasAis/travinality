import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

const FadeImage = (props) => {
  const { src } = props;

  const [visible, setVisible] = useState(false);

  const handleLoad = () => {
    setVisible(true);
  }

  return (
    <img
      className={`${props.className} ${style.image} ${visible && 'fadeIn'}`}
      src={src}
      alt=''
      onLoad={handleLoad}
    />
  );
}

FadeImage.propTypes = {
  src: PropTypes.string
}

export default FadeImage;
