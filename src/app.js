const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast =  require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'App Builder'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'App Builder'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'App Builder'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'please add an address'    
        })
    }
    const address = req.query.search
    geocode(address, (error,{lat,lon,loc} = {}) =>{
        if(error){
          return res.send({error})
        }
        forecast(lat, lon, (error, {temperature}) => {
          if(error){
            return res.send({error})
          }
          res.send({location : loc ,
            temperature: temperature})
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'please add a search'    
        })
    }
    res.send({
        products:[]    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'App Builder',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'App Builder',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})