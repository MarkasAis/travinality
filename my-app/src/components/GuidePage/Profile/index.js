import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GuideBanner from '../Banner';
import GuideDescription from '../Description';
import GuideTracker from '../Tracker';

import style from './style.module.css';

const GuideProfile = (props) => {
  const { guide } = props;

  return (
    <div className={`${style.mainContainer} ${props.className}`}>
      <GuideBanner
        name={guide && guide.name}
        picture={guide && guide.picture}
        locationName={guide && guide.currentLocation.name}
        online={guide && guide.active}
      />
      <div className={style.bottomContainer}>
        <div className={style.left}>
          <GuideDescription
            className={style.description}
            placeOfOrigin={guide && guide.origin}
            description={guide && guide.description}
            phone={guide && guide.phone}
            email={guide && guide.email}
            name={guide && guide.name}
          />
        </div>
        <div className={style.right}>
          <GuideTracker
            currentLocation={guide && guide.currentLocation}
            previousLocations={guide && guide.previousLocations}
          />
        </div>
      </div>
    </div>
  );
}

GuideProfile.propTypes = {
  guide: PropTypes.object
}

export default GuideProfile;
