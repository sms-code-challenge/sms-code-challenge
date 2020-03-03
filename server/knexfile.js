const connection = process.env.POSTGRES_CONNECTION || 'postgres://sms:sms@postgres/sms'

module.exports = {
  development: {
    client: 'pg',
    connection,
    pool: {
      afterCreate: (conn, done) => {
        conn.query('SET timezone="UTC";', (err) =>{
          if (err) {
            console.log(err)
          }
          done(err, conn)
        })
      }
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}
