const request = require('request');

const geocodeAddress = (address) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAkfxWhTdwHBhTKM0TE834dNe0ocPz4PBE`,
        json: true
    }, (err, res, body) => {
        if (err) {
            console.error('Unable to connect to Google servers.');
        } else if (body.status === "ZERO_RESULTS") {
            console.error('Unable to find this address!');
        } else if (body.status === "OK") {
            console.log(`Address: ${body.results[0].formatted_address}`)
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
    });
};

module.exports = {
    geocodeAddress
}