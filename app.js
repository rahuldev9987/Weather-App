const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utlis/geocode')
const forcast = require('./utlis/forcast')
const request = require('request')
// Defines paths for Express config
const app = express()
const pubdir = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup Handlebars engine&views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup Static directory to serve
app.use(express.static(pubdir))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rahul Vyas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Rahul Vyas"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        number: 998719,
        title: 'Help',
        name: 'Rahul Vyas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404 help",
        msg: "Help artical not Found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        msg: "Page not found",
        name: "Rahul Vyas"
    })
})

app.listen(5555, () => {
    console.log('Server is up on port 5555')
})