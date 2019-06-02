const request = require('request')

const geocode = (address, callback) => {
    const weatherURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWtzaGF5MTQwMjEiLCJhIjoiY2p3Y2t3ZjB4MDJkeTQ5bjI5OTFlNDMxYiJ9.ebiJH2wlp4lW9ytAN72K_A&limit=1`

    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback(`Unable to connect to location services. Try another search`, undefined)
        } else if (response.body.features.length === 0) {
            callback(`Unable to find the location. Try another search`, undefined)
        } else {
            callback(undefined, response.body.features[0])
        }
    })
}

module.exports = geocode