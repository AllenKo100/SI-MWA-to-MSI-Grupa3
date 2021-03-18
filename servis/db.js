const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'si-baza',
    host: '167.99.244.168',
    database: 'monitor',
    password: 'sipassword2021',
    port: 5432,
})
  

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}