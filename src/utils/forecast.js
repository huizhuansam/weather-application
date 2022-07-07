const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca9ad489813edf951b2f2aece22bf87a&query=' + 
        latitude + 
        ',' + 
        longitude + 
        '&units=f';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
            return;
        }

        if (body.error) {
            callback('Unable to find location', undefined);
            return;
        }

        const { current: { temperature, feelslike } } = body;

        callback(undefined, 
            'It is currently ' + 
            temperature + 
            ' degrees out. It feels like ' + 
            feelslike + 
            ' degrees out.');
    });
};

module.exports = forecast;
