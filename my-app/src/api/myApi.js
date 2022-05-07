import ApiBase from './apiBase';
import GoogleApi from './googleApi';

import { formatGuide, formatGuides } from '../utils/formaters/guide';
import { extractAddress } from '../utils/formaters/address';
import { latLngDistance } from '../utils/math';

/*const DefaultGuideBody = {  TODO: make update requests more flexible
  "data": {
    "type": "guides",
    "id": null,
    "attributes": { }
}*/

const ROUTES = {
  guides: 'http://localhost:3000/api/v1/guides',
  locations: 'http://localhost:3000/api/v1/locations',
  sessions: 'http://localhost:3000/api/v1/sessions'
};

const MIN_DISTANCE_THRESHOLD = 100;

class MyApi extends ApiBase {
  constructor() {
    super(ROUTES);
  }

  /**
   * Sends a login  request to the back-end, and if sucessful store a session cookie
   * @param {String} email - The email used for authentication
   * @param {String} password - The password used for authentication
   * @returns {Object} - Response status
   */
  async login(email, password) {
    const options = {
      route: 'sessions',
      request: 'post',
      type: 'login',
      attributes: {               // Attributes passed to the request's body
        email: email,
        password: password
      },
      other: {
        withCredentials: true     // Include session cookie and authentication information
      }
    };

    const response = await this.customRequest(options);

    return response;
  }

  async requestLoggedInGuide() {
    const options = {
      route: 'sessions',
      request: 'get',
      include: ['locations'],
      other: {
        withCredentials: true
      }
    };

    const response = await this.customRequest(options);

    return formatGuide(response.data)
  }

  async logout() {
    const options = {
      route: 'sessions',
      request: 'delete',
      other: {
        withCredentials: true
      }
    };

    const response = await this.customRequest(options);

    return response;
  }

  async requestGuides(perPage, pageNumber=1, countries) {
    const options = {
      route: 'guides',
      request: 'get',
      pageSize: perPage,
      pageNumber: pageNumber,
    };

    if (countries && countries.length)
      options.filters = { cur_country: countries };

    const response = await this.customRequest(options);

    return formatGuides(response.data);
  }

 /**
  * Requests guide's data from the back-end.
  * @param {Integer} id - The ID of the guide
  * @returns {Object} - Formatted guide data.
  */

  async requestGuide(id) {
    try {


      const options = {
        route: 'guides',
        request: 'get',
        id: id,
        include: ['locations'],
        sort: '-locations.created_at'
      };


      const response = await this.customRequest(options);

      return formatGuide(response.data);

    } catch (e) {
      return null;
    }
  }

  async updateGuide(attributes) {
    const options = {
      route: 'guides',
      request: 'post',
      type: 'guides',
      attributes: attributes,
      other: {
        withCredentials: true
      }
    };

    return this.customRequest(options);
  }

  async updateGuidePosition(curPosition, lastPosition) {

    // curPosition = {
    //   latitude: 48.864716,
    //   longitude: 2.349014
    // }
    //
    // const address = {
    //   country: 'France',
    //   city: 'Paris'
    // }

    if (latLngDistance(curPosition, lastPosition) > MIN_DISTANCE_THRESHOLD) {
      const address = extractAddress(await GoogleApi.requestLocationAddress(curPosition));
      if (!address) return;

      return this.updateGuide({
        cur_latitude: curPosition.latitude,
        cur_longitude: curPosition.longitude,
        cur_country: address.country,
        cur_loc_name: address.name
      });
    }
  }



}

export default new MyApi();
