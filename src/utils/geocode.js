const request = require('postman-request');

// Geocoding service

const geoCode = (address, callback) => {
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1Ijoidmpha2FpciIsImEiOiJja2J4YmYxcjEwNXFwMnNuNGxiOWtiaHJzIn0.aPgaUZ0LdXBJdxhsn539wQ`,
      json: true,
    },
    (error, response, data) => {
      if (response && 200 === response.statusCode) {
        callback(undefined, data.features[0].center);
      } else if (!response.body.features.length) {
        callback({
          error: 'Unable to fetch geo location for the given address',
        });
      } else {
        callback(error);
      }
    }
  );
};

module.exports = geoCode;
