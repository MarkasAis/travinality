import React from 'react';
import { GoogleMap, withGoogleMap } from 'react-google-maps';

import style from './style.module.css';
import mapStyles from './mapStyles';

const mapsKey = 'AIzaSyCaPTqkoHecdzsFTSmwCRIif7SGEtv6PlI';

const bounds = {
  north: 85,
  south: -85,
  west: -179,
  east: 179,
};

const MapBase = withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 45, lng: 0 }}
      defaultOptions={{
        styles: mapStyles,
        restriction: {
          latLngBounds: bounds,
          strictBounds: true,
        },
        mapTypeControl: false
      }}
    >
      {props.children}
    </GoogleMap>
  );
});

const Map = (props) => {
  return (
    <div className={`${props.className} ${style.container}`}>
      <MapBase
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapsKey}`}
        loadingElement={<div style={{ width: '100%', height: '100%' }} />}
        containerElement={<div style={{ width: '100%', height: '100%' }} />}
        mapElement={<div style={{ width: '100%', height: '100%' }} />}
      >
        {props.children}
      </MapBase>
    </div>
  );
};

export default Map;
