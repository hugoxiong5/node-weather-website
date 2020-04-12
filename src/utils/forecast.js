const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f5956ec4055289beb0d6035c4c71708f&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, function (err, { body } = {}) {
    if (err) {
      callback('Unable to connect to Weatherstack.', undefined);
    } else if (body.error) {
        callback('Unable to find valid location.', undefined);
    } else {
      const data = body.current;
      const {weather_descriptions:description, temperature, feelslike} = data;
      const timeofday = 'day';
      if (data.is_day === 'no') {
        timeofday = 'night'
      }
      const message = `${description[0]}. It's ${timeofday}, and it's currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
      callback(undefined, message);
    };
  });

}

module.exports = forecast;