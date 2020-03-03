const json = require('./data.json')
const map_city = require('../../map_city')

const cities = json.map(map_city)

exports.seed = (knex) => {
  return knex('city').del().then(() => {
    return knex('city').insert(cities)
  })
}
