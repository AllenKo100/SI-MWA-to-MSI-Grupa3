const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'si-baza',
    host: 'localhost',
    database: 'monitor',
    password: 'sipassword2021',
    port: 5432,
})


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}