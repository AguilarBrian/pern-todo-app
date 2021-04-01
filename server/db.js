const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'EXAMPLE', //!<-- your password for postgres here
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
});

module.exports = pool;
