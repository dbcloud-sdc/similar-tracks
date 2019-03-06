const CONFIG = require('../../config.js');
const pg = require('pg');

const client = new pg.Client({
  user: CONFIG.POSTGRES.USER,
  host: CONFIG.POSTGRES.URL,
  database: CONFIG.POSTGRES.DBNAME,
  password: CONFIG.POSTGRES.PASS,
  port: CONFIG.POSTGRES.PORT,
});

client.connect(); //TODO: determine if the connection should be open/closed or remain open

module.exports = {
  process: (term) => {
    return new Promise((resolve, reject) => {
      client.query(term, (err, res) => {
        if (err) reject(err);
        else     resolve(res);
      });
    });
  },
};
