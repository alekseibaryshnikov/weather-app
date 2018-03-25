const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=117535%203-%D0%B9%20%D0%94%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9%20%D0%BF%D1%80%D0%BE%D0%B5%D0%B7%D0%B4%20%D0%B45.%20%D0%BA.2%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&key=AIzaSyAkfxWhTdwHBhTKM0TE834dNe0ocPz4PBE',
    json: true
}, (err, res, body) => {
    console.log(body);
});