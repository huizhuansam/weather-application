const request = require('request');
const weatherstackApiKey = process.env.WEATHERSTACK_API_KEY;

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+ 
        weatherstackApiKey + 
        '&query=' + 
        latitude + 
        ',' + 
        longitude + 
        '&units=m';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
            return;
        }

        if (body.error) {
            callback('Unable to find location', undefined);
            return;
        }

        const { current: { temperature, feelslike, humidity } } = body;

        callback(undefined, 
            'It is currently ' + 
            temperature + 
            ' degrees out. It feels like ' + 
            feelslike + 
            ' degrees out. The humidity level is ' + 
            humidity + 
            '%.');
    });
};

module.exports = forecast;
