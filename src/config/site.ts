// Site-wide configuration. Edit the `address` object below to update the
// address everywhere on the site (page copy, footer, JSON-LD schema, map links,
// and OpenStreetMap embed).

export const address = {
  street: '5031 19th Ave. NE',
  city: 'Seattle',
  state: 'WA',
  zip: '98105',
  lat: 47.6657,
  lng: -122.3055,
};

// Derived strings
export const addressFull = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
export const addressShort = `${address.street} · ${address.city}, ${address.state}`;

// Map links
export const googleMapsUrl =
  `https://www.google.com/maps/place/${encodeURIComponent(addressFull)}`;

// OpenStreetMap embed (small bounding box around the marker)
const bboxDelta = 0.003;
const bbox = [
  address.lng - bboxDelta,
  address.lat - bboxDelta,
  address.lng + bboxDelta,
  address.lat + bboxDelta,
].join('%2C');
export const osmEmbedUrl =
  `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
  `&layer=mapnik&marker=${address.lat}%2C${address.lng}`;
export const osmLargeMapUrl =
  `https://www.openstreetmap.org/?mlat=${address.lat}&mlon=${address.lng}` +
  `#map=17/${address.lat}/${address.lng}`;
