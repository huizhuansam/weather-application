require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hui Zhuan',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hui Zhuan',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some help text',
        name: 'Hui Zhuan',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address',
        });
        return;
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({
                error,
            });
            return;
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error,
                });
                return;
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term',
        });
        return;
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Hui Zhuan',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Hui Zhuan',
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});
