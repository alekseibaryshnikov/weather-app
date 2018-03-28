const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            describe: 'The user address for fetching weather by address.',
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${argv.address}&key=AIzaSyAkfxWhTdwHBhTKM0TE834dNe0ocPz4PBE`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw Error('Unable to find that address.');
        }     
        const formatedAddress = response.data.results[0].formatted_address;
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        console.log("\n--\n");
        console.log(`Weather for address: ${formatedAddress}`);
        const forecastUrl = `https://api.darksky.net/forecast/7b1f19524c1d10d08042717546091e9d/${lat},${lng}`;
        return axios.get(forecastUrl);
    })
    .then((response) => {
        const currentlyTempreture = _temperatureConverter(response.data.currently.temperature);
        const apparentTemperature = _temperatureConverter(response.data.currently.apparentTemperature);
        const summary = response.data.currently.summary;   
        console.log(`Now is ${currentlyTempreture} C. Apparent termperature is ${apparentTemperature} C. Summary: ${summary}.`);
        console.log("\n--\n");
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.')
        } else {
            console.log('Error:' + e.message);
        }
    });

/**
 * Private
 * 
 * Method for converting tempreture from Fahrenheit to Celsium
 * @param {number} tF 
 */
const _temperatureConverter = (tF) => {
    return (5 / 9 * (tF - 32)).toFixed(2);
};