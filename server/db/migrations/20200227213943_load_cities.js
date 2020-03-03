exports.up = function(knex) {
  return knex.schema.createTable('city', t => {
    t.integer('id').primary()
    t.text('name').notNullable()
    t.date('start_date').notNullable()
    t.date('end_date').notNullable()
    t.decimal('price').notNullable()
    t.text('status').notNullable()
    t.text('color').notNullable()
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('city')
};
