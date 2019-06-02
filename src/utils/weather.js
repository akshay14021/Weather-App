const request = require('request')

const weather = (longitude, latitude, callback) => {
    const weatherURL = `https://api.darksky.net/forecast/5e69460d37881d7ae222eb626df40355/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}?lang=en&units=si`
    
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = weather