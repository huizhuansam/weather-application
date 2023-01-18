import request from 'request';
import * as dotenv from 'dotenv';

dotenv.config()
const maptilerApiKey = process.env.MAPTILER_API_KEY;

const geoCode = (address, callback) => {
    const url = 'https://api.maptiler.com/geocoding/' + 
        encodeURIComponent(address) + 
        '.json?key=' + 
        maptilerApiKey;

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

export default geoCode;
