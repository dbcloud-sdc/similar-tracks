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

module.export = {
  getSongs: (id) => {
    //placeholder
    return new Promise();
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
