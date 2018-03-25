const request = require('request');

const getWeather = (lat, lng, callback) => {
    const uri = `https://api.darksky.net/forecast/7b1f19524c1d10d08042717546091e9d/${lat},${lng}`;
    request({
        uri,
        json: true
    }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to forecast servers.');
        } else {
            callback(body);
        }
    });
}

module.exports = {
    getWeather
}