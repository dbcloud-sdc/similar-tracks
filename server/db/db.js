const CONFIG = require('../../config.js');
const pg = require('pg');
const path = require('path');

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
  getSongs: (id) => {
    const term = `SELECT * FROM songs WHERE
               id=(SELECT songa FROM related WHERE id=${id})
            OR id = (SELECT songb FROM related WHERE id=${id})
            OR id = (SELECT songc FROM related WHERE id=${id});`
    return query(term);
  },
  create: (id, record) => {
    //placeholder
    return new Promise();
  },
  read: (id) => {
    //placeholder
    return new Promise();
  },
  update: (id, record) => {
    //placeholder
    return new Promise();
  },
  delete: (id) => {
    return new Promise();
  },
  reset: () => {

  }
};
