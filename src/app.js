const express = require('express');
const path = require('path');
// Geocode
const geoCode = require('./utils/geocode');
// forecast
const forecast = require('./utils/forecast');

// Path to the current working directory
console.log(__dirname);
// Path to the current file
console.log(__filename);

// Path - Core node module
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// This acts as default root in case of mismatch
// The root path is always matched to public folder which serves index.html
const publicDirPath = path.join(__dirname, '../public');

// Serve the public folder by default
app.use(
  express.static(publicDirPath)
);

// app.com
// app.com/about
// app.com/help

app.get(``, (req, res) => {
  // It can send html response
  res.send('<h1>Hello. Welcome to node!!!</h1>');
});

app.get(`/help`, (req, res) => {
  // It can send json response
  res.send({
    name: 'Irshadahmed',
    age: 34,
  });
});

app.get(`/about`, (req, res) => {
  res.send('<h1>About page</h1>');
});

app.get(`/weather`, (req, res) => {
  const { address = null } = req.query;

  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    })
  }

  geoCode(address, (error, [longitude, latitude] = []) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(longitude, latitude, (error, response) => {
      if (error) {
        return res.send({
          error,
        });
      }

      return res.send(response);
    });
  });
});

app.get(`/products`, (req, res) => {
  const { search = null } = req.query;
  if (!search) {
    return res.send({
      error: 'You must provide a search time'
    });
  }
  res.send({
    products: []
  })
});

app.listen(port, () => {
  console.log('Server listening on port 3000');
});