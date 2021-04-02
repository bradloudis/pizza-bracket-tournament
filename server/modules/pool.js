const pg = require('pg');

const config = {
  database: 'pizza_bracket_tournament',
  host: 'localhost',
  post: 5432,
  max: 10,
  idleTimeoutMillis: 10000,
};

module.exports = new pg.Pool(config);
