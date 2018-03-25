const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address);