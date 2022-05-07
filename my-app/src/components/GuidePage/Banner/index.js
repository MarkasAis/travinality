import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GoogleApi from '../../../api/googleApi'

import FadeImage from '../../FadeImage';
import Hex from '../../Hex'
import OnlineStatus from '../OnlineStatus';

import style from './style.module.css';

const defaultBackground = '/banner_bg.jpg';

const GuideBanner = (props) => {
  const { name, picture, locationName, online } = props;

  const [background, setBackground] = useState(null);

  useEffect(() => {
    if (locationName) {
      loadBackground();
    }
  }, [locationName]);

  const loadBackground = async () => {
    try {
      if (!locationName)
        throw 'Location name not provided.';

      const response = await GoogleApi.requestPlacePhoto(locationName);

      if (response)
        setBackground(response);
      else
        setBackground(defaultBackground);
    } catch(e) {
      setBackground(defaultBackground);
      console.log(e);
    }
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.backgroundContainer}>
        <FadeImage className={style.background} src={background} />
      </div>
      <div className={style.left}>
        <Hex className={style.hex} image={picture} size={250} />
      </div>
      <div className={style.right}>
        <div className={'centerY'}>
          <h1>{name}</h1>
          {locationName && <p><span>Currently in:</span> <span>{locationName}</span></p>}
          <OnlineStatus online={online} />
        </div>
      </div>
    </div>
  );
}

GuideBanner.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
  locationName: PropTypes.string
}

export default GuideBanner;
