const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'your_database_connection_string',
  max: 20,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
