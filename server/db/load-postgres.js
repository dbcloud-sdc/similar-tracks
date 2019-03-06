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

const load = (reference, dropTable, createTable, loadCSV) => {
  client.connect();
  pgQuery(dropTable)
  .then(() => {
    console.log(`${reference} table dropped`);
    pgQuery(createTable)
    .then(() => {
      console.log(`${reference} table created`);
      pgQuery(loadCSV)
      .then(() => {
        console.log(`${reference} table loaded from CSV file`);
        client.end();
      })
    })
  }).catch(err => {
    console.log(err);
    client.end();
  })
}

const pgQuery = (term) => {
  return new Promise((resolve, reject) => {
    client.query(term, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

//******************** SONG TABLE ***************/
const songCSVSource = path.join(__dirname, '../../../data.nosync/songs_table.csv');
const loadSongCSV = `COPY songs FROM '${songCSVSource}' DELIMITER ',' CSV HEADER;`;
const dropSongTables = `DROP TABLE IF EXISTS songs`;
const createSongTable = `
          CREATE TABLE songs (
            id SERIAL PRIMARY KEY,
            song_id int,
            title varchar(50),
            album_pic int,
            username varchar(30),
            user_pic int,
            num_likes int,
            num_comments int,
            num_reposts int
          )`;


//******************** RELATED TABLE ***************/
const relatedCSVSource = path.join(__dirname, '../../../data.nosync/relations-table.csv');
const loadRelatedCSV = `COPY related FROM '${relatedCSVSource}' DELIMITER ',' CSV HEADER;`;
const dropRelatedTable = `DROP TABLE IF EXISTS related`;
const createRelatedTable = `
          CREATE TABLE related (
            id SERIAL PRIMARY KEY,
            songa int,
            songb int,
            songc int
          )`;

//******************** FUNCTION CALLS ***************/
//****************** Use one at a time **************/

//load('songs', dropSongTables, createSongTable, loadSongCSV);
//load('relations', dropRelatedTable, createRelatedTable, loadRelatedCSV);
