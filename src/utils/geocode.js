const request = require('request');

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiaHVnb3hpb25nIiwiYSI6ImNrOHY5eWR6YTAxZm8zZmw0azltbGI3eWsifQ.YNl4VjHl2t8WOgI3z3d9iQ&limit=1`

  request({url, json: true}, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to Mapbox.', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find matching results. Try another search.', undefined);
    } else {
      const features = body.features[0];
      const {place_name:placename, center:coordinates} = features;
      const longitude = coordinates[0];
      const latitude = coordinates[1];
      callback(undefined, {
        placename,
        longitude,
        latitude
      });
    }
  })

};

module.exports = geocode;