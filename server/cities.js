const knex = require('./knex')

const findAll = knex.select('*').from('city')

const findById = id => knex.select('*').from('city').where('id', '=', id).first()

const save = city => knex.insert(city).into('city')

const remove = id => knex.delete().from('city').where('id', '=', id)

module.exports = {
  findAll,
  findById,
  save,
  remove
}
