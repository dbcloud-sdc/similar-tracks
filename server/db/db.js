const CONFIG = require('../../config.js');
const pg = require('pg');

const client = new pg.Client({
  user: CONFIG.POSTGRES.USER,
  host: CONFIG.POSTGRES.URL,
  database: CONFIG.POSTGRES.DBNAME,
  password: CONFIG.POSTGRES.PASS,
  port: CONFIG.POSTGRES.PORT,
});

const pool = new pg.Pool({
  user: CONFIG.POSTGRES.USER,
  host: CONFIG.POSTGRES.URL,
  database: CONFIG.POSTGRES.DBNAME,
  password: CONFIG.POSTGRES.PASS,
  port: CONFIG.POSTGRES.PORT,

  // idleTimeoutMillis: 20000,
  // connectionTimeoutMillis: 3000,
  max: 50 //default
});

pool.connect();
// client.connect(); //TODO: determine if the connection should be open/closed or remain open

module.exports = {
  process: (term) => {
    return new Promise((resolve, reject) => {
      //IMPORTANT: no releaseCallback is required because we are only performing a single query.
      pool.query(term, (err, res) => {
        if (err) reject(err);
        else     resolve(res);
      });
    });
  },
};
