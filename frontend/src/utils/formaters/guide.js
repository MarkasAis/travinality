const FORMATING_SCHEMA = {
  guide: {
    cur_country: 'currentLocation/country',
    cur_latitude: 'currentLocation/latitude',
    cur_longitude: 'currentLocation/longitude',
    cur_loc_name: 'currentLocation/name'
  },
  location: {
    date: 'visitDate'
  }
}
//

// const FORMATING_SCHEMA = {
//   guide: {
//     cur_country: 'currentLocation/country',
//     cur_latitude: 'currentLocation/latitude',
//     cur_longitude: 'currentLocation/longitude',
//     cur_loc_name: 'currentLocation/name'
//   },
//
//   ...
// }
//
// {
//   cur_loc_name: 'Paris'
// }
//
// {
//   currentLocation: {
//     name: 'Paris'
//   }
// }

//
//       Raw Guide Data
// {
//   name: "Ash Ketchum",
//   phone: "530-291-2525",
//   cur_country: "Nepal",
//   cur_latitude: 28.6766537,
//   cur_longitude: 83.9325289,
//   cur_loc_name: "Himalayas"
// }
//
//     Formatted Guide Data
// {
//   name: "Ash Ketchum",
//   phone: "530-291-2525",
//   currentLocation: {
//     country: "Nepal",
//     latitude: 28.6766537,
//     longitude: 83.9325289,
//     name: "Himalayas"
//   }
// }

/**
 * Formats raw data.
 * @param {Object} data - A raw data object.
 * @param {string} type - Type of data
 * @returns {Object} - A nested object with formatted data.
 */
const formatHelper = (data, type) => {
  // An object where the formatted data will be stored
  const formatted = {};

  // For each KEY, VALUE pair in the raw DATA object
  Object.entries(data).forEach(([key, value]) => {

    // Get the path where the VALUE should be stored in the formatted object
    let path = FORMATING_SCHEMA[type][key];

    if (path) {
      // Split the path string into an array using a '/' delimitor
      path = path.split('/');

      // Initialize a pointer variable at the root of the formatted data object
      let top = formatted;

      // Traverse the foramtted data object using the PATH
      for (let i = 0, len = path.length-1; i < len; i++) {

        // If a child object does not exist, create one
        if (!top[path[i]])
          top[path[i]] = {};

        // Traverse to the child object
        top = top[path[i]];
      }

      // Store the VALUE in the formatted data object
      top[path[path.length-1]] = value;
    } else {
      // If a path is not found, copy the VALUE into the formatted data object under the same KEY
      formatted[key] = value;
    }
  });

  return formatted;
}

const formatGuideHelper = (guideAttributes, id) => {
  const guide = formatHelper(guideAttributes, 'guide');

  if (id) guide.id = parseInt(id);

  return guide;
}

const formatLocationHelper = (locationAttributes) => {
  const location = formatHelper(locationAttributes, 'location');
  return location;
}

const formatLocationsHelper = (locationsData) => {
  const locations = locationsData.map(locationData => {
    return formatLocationHelper(locationData.attributes);
  });

  return locations;
}

export const formatGuide = (data) => {
  const guide = formatGuideHelper(data.data.attributes, data.data.id);

  if (data.included)
    guide.previousLocations = formatLocationsHelper(data.included);

  return guide;
}

export const formatGuides = (data) => {
  if (data.includes)
    console.log('guide formating with locations is not yet implemented.');

  const guides = data.data.map(guideData => {
    return formatGuideHelper(guideData.attributes, guideData.id);
  });

  return guides;
}

export const formatUpdate = (data) => {
  const update = {};

  update.guide = formatGuideHelper(data.data.updates.guide);

  if (data.data.updates.location)
    update.location = formatLocationHelper(data.data.updates.location);

  update.id = data.data.id;

  return update;
}
