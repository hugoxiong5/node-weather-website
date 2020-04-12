const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather by Hugo',
    author: 'Hugo Xiong'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    author: 'Hugo Xiong'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    author: 'Hugo Xiong',
    message: 'this is a help message'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (err, { placename, longitude, latitude } = {}) => {
    if (err) {
      return res.send({error: err});
    }

    forecast(longitude, latitude, (err, message) => {
      if (err) {
        return res.send({error: err});
      }
      return res.send({
        forecast: message,
        location: placename,
        query_address: req.query.address,
      });
    });

  });

})


app.get('/help/*', (req, res) => {
  res.render('404', {
      title: '404 Error',
      author: 'Hugo Xiong',
      errorMsg: 'Sorry, help article not found.'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
      title: '404 Error',
      author: 'Hugo Xiong',
      errorMsg: 'Sorry, page not found.'
  });
})

app.listen(3000, () => {
  console.log('Server listening on port 3000.')
})