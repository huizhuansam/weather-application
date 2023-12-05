# weather-application
A simple weather app built with NodeJS and ready to be deployed. Consumes API from maptiler.com and weatherstack.com.

# Getting Started
Clone the repository to your machine and run the following
```bash
npm i
npm run dev
```
to install Node dependencies and start the development server at port 3000.

**Note:**
`npm run dev` uses nodemon for hot reloading. If you do not have it installed, it will not work.

## Hooking up the APIs
To enable the geolocation and weather services, you will need API keys for Maptiler and Weatherstack respectively. 
Create free accounts for both and request for the API keys. Create an `.env` file at the root of the project folder with the following content:
```
WEATHERSTACK_API_KEY=[your Weatherstack API key]
MAPTILER_API_KEY=[your Maptiler API key]
```

# Overview
The application logic is a simple nesting of callback functions from `src/utils/geoCode.js` and `src/utils/forecast.js`. 
`geoCode` makes a HTTPS request for Maptiler API with user input, which translates the query string into coordinates. 
The resulting response is then passed to `forecast`, which makes a HTTPS request for Weatherstack API to return the weather data from the given coordinate.

# Learning Summary
This project is primarily meant for me to learn NodeJS and backend development. Please excuse the very plain frontend!

* ExpressJS 
  * Creating HTTP endpoints
  * Handling invalid routes (404 pages)
* NPM Request module
  * Making HTTP requests
  * Request error handling
  * Javascript callback pattern
* Basic frontend styling with HTML, CSS, and Handlebars (NPM hbs)
* App deployment to Heroku (deprecated)

BONUS BROWNIE POINTS for deploying the app to GCP and figuring out how to do it by myself.
