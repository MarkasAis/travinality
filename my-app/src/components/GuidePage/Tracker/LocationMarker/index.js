import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';

const LocationMarker = (props) => {
  const { location } = props;

  return (
    <Marker
      position={{
        lat: location.latitude,
        lng: location.longitude
      }}
      icon={{
          url: (props.color === 'green' ? '/marker_green.svg' : '/marker_blue.svg'),
          scaledSize: new window.google.maps.Size(40, 55),
          fillColor: 'green'
      }}
      onClick={props.onClick}
    />
  );
};

LocationMarker.propTypes = {
  location: PropTypes.object
}

export default LocationMarker;
