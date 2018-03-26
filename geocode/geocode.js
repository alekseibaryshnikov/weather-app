const request = require('request');

/**
 * Public
 * 
 * Get the formatted address
 * There we use google geocode API
 * 
 * @param {string|number} address 
 * @param {function} callback 
 */
const geocodeAddress = (address, callback) => {

    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAkfxWhTdwHBhTKM0TE834dNe0ocPz4PBE`,
        json: true
    }, (err, res, body) => {

        if (err) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === "ZERO_RESULTS") {
            callback('Unable to find this address!');
        } else if (body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
        
    });
};

module.exports = {
    geocodeAddress
}