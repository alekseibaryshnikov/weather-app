const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const darksky = require('./darksky/darksky');

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

geocode.geocodeAddress(argv.address, (addressErr, address) => {
    if (addressErr) {
        console.log(addressErr);
    } else {
        darksky.getCurrentWeather(address.latitude, address.longitude, (weatherErr, weather) => {
            if (weatherErr) {
                console.log(weatherErr);
            } else {
                console.log(`Address: ${address.address}`);
                console.log(`Now is ${weather.temperature.toFixed(2)} C. Apparent termperature is ${weather.apparentTemperature.toFixed(2)} C. Summary: ${weather.summary}.`);
            }
        });
    }
});