const CONFIG = require('../../config.js');
const pg = require('pg');
const path = require('path');

const dropTables = `DROP TABLE IF EXISTS songs, related`;

const createSongTable = `
          CREATE TABLE "songs" (
            "id" SERIAL PRIMARY KEY,
            "song_id" int,
            "title" varchar(50),
            "album_pic" int,
            "username" varchar(30),
            "user_pic" int,
            "num_likes" int,
            "num_comments" int,
            "num_reposts" int
          )`


//COPY ____ FROM 'filename' DELIMITER ',' CSV HEADER;
const csvSource = path.join(__dirname, '../../../data.nosync/songs_table.csv');
const csvCopy = `COPY songs FROM '${csvSource}' DELIMITER ',' CSV HEADER;`;

const client = new pg.Client({
  user: CONFIG.POSTGRES.USER,
  host: CONFIG.POSTGRES.URL,
  database: CONFIG.POSTGRES.DBNAME,
  password: CONFIG.POSTGRES.PASS,
  port: CONFIG.POSTGRES.PORT,
});

client.connect();
client.query(dropTables, (err,res) => {
  if(err) {
    console.log(err)
  } else {
    console.log('tables dropped');
    client.query(createSongTable, (err, res) => {
      if (err) console.log(err);
      else {
        console.log('table created successfully');
        client.query(csvCopy, (err) => {
          if (err) {
            console.log(err);
            console.log('closing connection');
            client.end();
          }
          else {
            console.log('table copied');
            client.end();
          }
        })
      }
    })
  }
})
