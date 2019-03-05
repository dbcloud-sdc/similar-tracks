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

const query = (term) => {
  return new Promise((resolve, reject) => {
    client.query(term, (err, res) => {
      if (err) reject(err);
      else     resolve(res);
    });
  });
}

module.exports = {
  getRelatedSongs: (id) => {
    let term = `SELECT * FROM songs WHERE
               id = (SELECT songa FROM related WHERE id=${id})
            OR id = (SELECT songb FROM related WHERE id=${id})
            OR id = (SELECT songc FROM related WHERE id=${id});`
    return query(term);
  },
//***** For updating the related table via CRUD *****/
  process: (term) => {
    return query(term);
  },
};
