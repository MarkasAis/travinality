export const latLngDistance = (p1, p2) => {
  const lat1 = toRadians(p1.latitude);
  const lat2 = toRadians(p2.latitude);
  const deltaLng = toRadians(p2.longitude - p1.longitude);
  const r = 6371000;
  const dist = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
                         Math.cos(lat1) * Math.cos(lat2) *
                         Math.cos(deltaLng)) * r;

  return dist;
}

export const toRadians = (value) => {
  return value * Math.PI / 180;
}
