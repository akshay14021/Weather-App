const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Defining paths for Express config and setting them for Express
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akshay Joshi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshay Joshi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some text to help you',
        name: 'Akshay Joshi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address.'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        const longitude = data.center[0]
        const latitude = data.center[1]
        const location = data.place_name

        weather(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            const summary = data.daily.data[0].summary
            const temperature = data.currently.temperature
            const precip = data.currently.precipProbability

            return res.send({
                location: location,
                forecast: `${summary} It is currently ${temperature} degrees out. There is ${precip} % chance of rain`,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Akshay Joshi',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Akshay Joshi'
    })
})

// Server Setup

app.listen(3000, () => {
    console.log('Server is up. Happy coding!')
})