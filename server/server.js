const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = process.env.PORT || 3000
const knex = require('./knex')

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use('/', routes)

knex.migrate.latest().then(() => {
  console.log('Database schema migration completed')
  knex.seed.run().then(() => {
    console.log('Database seed completed')
    app.listen(port, () => { 
      console.log(`Server started`)
    })
  })
})
