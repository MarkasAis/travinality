const addressTypePriority = {
  administrative_area_level_1: 1,
  administrative_area_level_2: 2,
  administrative_area_level_3: 3,
  administrative_area_level_4: 4,
}

const getTypePriority = (type) => {
  if (!addressTypePriority[type])
    return 999;
  else
    return addressTypePriority[type];
}

export const extractAddress = (data) => {
  if (data.length === 0) return null;
  if (data.length < 2) return {
    country: data[0].formatted_address,
    name: data[0].formatted_address
  };

  let first = { size: 999 };
  let second = { size: 999};

  data.forEach(entry => {
    const address = {
      text: entry.formatted_address,
      size: entry.formatted_address.split(',').length,
      priority: getTypePriority(entry.types[0])
    };

    if (address.size < first.size || (first.size !== 0 && address.priority < first.priority)) {
      second = first;
      first = address;
    } else if (address.priority < second.priority) {
      second = address;
    }
  });

  return {
    country: first.text,
    name: second.text
  };
}
