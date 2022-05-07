import axios from 'axios';

export default class ApiBase {
  constructor(routes) {
    this.routes = routes;
  }

  async customRequest(options) {
    // Checks if OPTIONS argument was passed, and that ROUTE and REQUEST type were specified
    if (!options)         throw new Error('options not given');
    if (!options.route)   throw new Error('route was not specified');
    if (!options.request) throw new Error('request method was not specified');

    // Select the route
    let url = this.routes[options.route];
    if (!url) throw new Error('route does not exist');

    // Concatenate an ID if one was specified
    if (options.id !== undefined) url += `/${options.id}`;

    // The following lines generate a QUERY STRING
    url += '?';

    if (options.pageNumber) url += `page[number]=${options.pageNumber}&`;
    if (options.pageSize)   url += `page[size]=${options.pageSize}&`;
    if (options.include)    url += `include=${options.include.join(',')}&`;
    if (options.sort)       url += `sort=${options.sort}&`;

    // Adds additional filters to the QUERY STRING
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, values]) => {
        url += `filter[${key}]=${values.join(',')}&`;
      });
    }

    // Remove the last left over '&' from the URL
    url = url.slice(0, -1);

    // GET request
    if (options.request === 'get')
      return axios.get(url, options.other);

    // DELETE request
    if (options.request === 'delete')
      return  axios.delete(url, options.other);

    // PUT or POST request
    if (options.request === 'put' || options.request === 'post') {
      // Checks if TYPE and ATTRIBUTES were specified
      if (!options.type)       throw new Error('request type was not specified');
      if (!options.attributes) throw new Error('request attributes were not given');

      // Construct JSON format request body
      const body = {
        data: {
          type: options.type,
          attributes: options.attributes
        }
      }

      // Attach the ID to request body if one was specified
      if (options.id) body.data['id'] = options.id;

      // A call to POST / PUT request, passing request body and additional attributes
      return axios[options.request](url, body, options.other);
    }

    // Throw an error if the specified REQUEST method did not match
    throw new Error('request method is not supported');
  }
}
