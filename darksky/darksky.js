const request = require('request');

/**
 * Public
 * 
 * Get current weather for setted latitude and longitude
 * There we use darksky API (forecast weather servers)
 * 
 * @param {float} lat 
 * @param {float} lng 
 */
const getCurrentWeather = (lat, lng) => {

    const uri = `https://api.darksky.net/forecast/7b1f19524c1d10d08042717546091e9d/${lat},${lng}`;

    return new Promise((resolve, reject) => {
        request({
            uri,
            json: true
        }, (err, res, body) => {
            if (err) {
                reject(`Unable to connect to forecast servers. Error code: ${err.code}, host: ${err.host}.`);
            } else if (!err && res.statusCode === 200) {
                resolve({
                    temperature: _temperatureConverter(body.currently.temperature),
                    apparentTemperature: _temperatureConverter(body.currently.apparentTemperature),
                    summary: body.currently.summary
                });
            } else if (res.statusCode === 400) {
                reject('Unable to fetch weather.');
            } else {
                reject('Unable to fetch weather.');
            }
        });
    });
}

/**
 * Private
 * 
 * Method for converting tempreture from Fahrenheit to Celsium
 * @param {number} tF 
 */
const _temperatureConverter = (tF) => {
    return (5 / 9 * (tF - 32));
};

module.exports = {
    getCurrentWeather
}