const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__dirname)
//console.log(__filename)

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlears engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directories to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Bob Levey'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Bob Levey'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Bob Levey'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must enter an address'
    })
  }
  const address = req.query.address
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send(error)
    }
    forecast(latitude, longitude, (error, forecastData = {}) => {
      if (error) {
        return res.send(error)
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must as search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',
    {
      title: '404 Error',
      name: 'Bob Levey',
      errorMessage: 'No article for this help'
    }
  )
})



app.get('*', (req, res) => {
  res.render('404',
    {
      title: '404 Error',
      name: 'Bob Levey',
      errorMessage: 'Page Not Found'
    }

  )
})
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})