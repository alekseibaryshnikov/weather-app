const request = require('request');

const getCurrentWeather = (lat, lng, callback) => {
    const uri = `https://api.darksky.net/forecast/7b1f19524c1d10d08042717546091e9d/${lat},${lng}`;
    request({
        uri,
        json: true
    }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to forecast servers.');
        } else {
            const toCelsium = 5 / 9 * (body.currently.temperature - 32);
            callback(undefined, {
                temperature: toCelsium,
                summary: body.currently.summary
            });
        }
    });
}

module.exports = {
    getCurrentWeather
}