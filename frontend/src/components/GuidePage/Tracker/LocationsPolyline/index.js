import React from 'react';
import PropTypes from 'prop-types';

import { Polyline } from 'react-google-maps';

const LocationsPolyline = (props) => {
  const { locations } = props;

  return (
    <Polyline
      geodesic={true}
      options={{
        path: locations.map(location => (
          {
            lat: location.latitude,
            lng: location.longitude
          }
        )),
        strokeOpacity: 0,
        icons: [{
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4
          },
          offset: '0',
          repeat: '20px'
        }]
      }}
    />
  );
};

LocationsPolyline.propTypes = {
  locations: PropTypes.array
}

export default LocationsPolyline;
