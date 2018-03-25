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

geocode.geocodeAddress(argv.address, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        darksky.getCurrentWeather(res.latitude, res.longitude, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(JSON.stringify(res, undefined, 2));
            }
        });
    }
});