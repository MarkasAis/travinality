class GoogleApi {
  constructor() {
    this.places = new window.google.maps.places.PlacesService(document.createElement('div'));
    this.geocoder = new window.google.maps.Geocoder();
  }

  async requestPlacePhoto(place) {
    const request = {
      query: place,
      fields: ['photo']
    };

    return new Promise(resolve => {
      this.places.findPlaceFromQuery(request, (results, status) => {
        if (status === 'OK' && results.length > 0 && results[0].photos)
          resolve(results[0].photos[0].getUrl());
        else
          resolve(null);
      });
    });
  }

  async requestLocationAddress(location) {
    const request = {
      location: new window.google.maps.LatLng(location.latitude, location.longitude)
    };

    return new Promise(resolve => {
      this.geocoder.geocode(request, (results, status) => {
        if (status === 'OK')
          resolve(results);
        else
          resolve(null);
      });
    });
  }
}

export default new GoogleApi();
