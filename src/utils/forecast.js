const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  request(
    {
      url: `http://api.weatherstack.com/current?access_key=b331612c7efa21b3ee5b8f8d0ca18750&query=${latitude},${longitude}&units=f`,
      json: true,
    },
    (error, response, data) => {
      if (response && 200 === response.statusCode) {
        callback(undefined, data);
      } else if (error) {
        callback(error, undefined)
      } else {
        callback({
          error: 'Unable to connect to geo API'
        }, undefined);
      }
    }
  );
};

module.exports = forecast;