const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
        '.json?access_token=pk.eyJ1IjoiYmluZ2JvbmdhY2NvdW50IiwiYSI6ImNsNHowc3pldTA1ZDczY252bHQzczN4YXgifQ.KGl-KYo8ijzWEGfSu-EEnA&limit=1';
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
            return;
        }

        const { features } = body;    

        if (features.length < 1) {
            callback('Unable to find location. Try another search.', undefined);
            return;
        }
        
        const { center, place_name: location } = features[0];
        const latitude = center[1];
        const longitude = center[0];

        callback(undefined, {
            latitude,
            longitude,
            location,
        });
    });
};

module.exports = geoCode;
