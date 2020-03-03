const routes = require('express').Router()
const cities = require('./cities')
const map_city = require('./map_city')

routes.get('/api/cities', (_, res) => {
  cities.findAll.then(rows => res.json(rows))
})
routes.get('/api/cities/:id', (req, res) => {
  cities.findById(req.params.id).then(row => {
    if (row) {
      res.json(row)
    } else {
      res.status(404).send()
    }
  })
})
routes.put('/api/cities/:id', (req, res) => {
  const city = map_city(req.body)
  city.id = req.params.id
  cities.save(city).then(() => {
    res.status(204).send()
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})
routes.delete('/api/cities/:id', (req, res) => {
  cities.remove(req.params.id).then(() => {
    res.status(204).send()
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})

module.exports = routes
