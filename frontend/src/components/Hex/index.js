import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FadeImage from '../FadeImage';

import style from './style.module.css';

const Hex = (props) => {
  const { size, fontSize, link, onClick, image, overlay, topText, bottomText } = props;

  return (
    <div className={`${props.className} ${style.hex}`} style={{
      width: size,
      height: size,
      fontSize: fontSize
    }}>
      <div className={style.hexIn}>
        <Link className={style.hexLink} to={(onClick || !link) ? '#' : link} onClick={onClick}>
          <FadeImage className={style.image} src={image} />
          { overlay && <div className={style.overlay} /> }
          { topText && <h2>{topText}</h2> }
          { bottomText && <p>{bottomText}</p> }
        </Link>
      </div>
    </div>
  );
}

Hex.propTypes = {
  size: PropTypes.number,
  fontSize: PropTypes.number,
  link: PropTypes.string,
	image: PropTypes.string,
  overlay: PropTypes.bool,
  topText: PropTypes.string,
  bottomText: PropTypes.string
}

export default Hex;
