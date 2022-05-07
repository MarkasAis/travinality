import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { InfoWindow } from 'react-google-maps';

import LocationMarker from './LocationMarker';
import LocationsPolyline from './LocationsPolyline';

import Map from '../../Map';

import style from './style.module.css';

const GuideTracker = (props) => {
  const {currentLocation, previousLocations} = props;

  const [activeLocation, setActiveLocation] = useState(null);

  const getAllLocations = () => {
    if (!currentLocation)
      return [];

    if (!previousLocations)
      return [currentLocation];
    else
      return [currentLocation].concat(previousLocations);
  }

  const generateMarkers = () => {
    return getAllLocations().map((location, index) => {
      let isCurrent = (index === 0);

      return (
        <LocationMarker
          key={index}
          location={location}
          color={isCurrent ? 'green' : 'blue'}
          onClick={() => {
            setActiveLocation(location);
          }}
        />
      );
    });
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Guide Tracker</h1>
      </div>
      <Map className={style.map}>
        {generateMarkers()}
        {<LocationsPolyline locations={getAllLocations()} />}
        {activeLocation &&
          <InfoWindow
            position={{
              lat: activeLocation.latitude,
              lng: activeLocation.longitude
            }}
            options={{
              pixelOffset: new window.google.maps.Size(0,-55)
            }}
            onCloseClick={() => {
              setActiveLocation(null);
            }}
          >
            <div>
              <h2>{activeLocation.name}</h2>
              <p>{`Visit date: ${activeLocation.visitDate ? activeLocation.visitDate  : 'Now'}`}</p>
            </div>
          </InfoWindow>
        }
      </Map>
    </div>
  );
}

GuideTracker.propTypes = {
  currentLocation: PropTypes.object,
  previousLocations: PropTypes.array
}

export default GuideTracker;
