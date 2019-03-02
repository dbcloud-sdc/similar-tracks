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

var count = 0;
var timing = [];

const getRelatedTracks = (id) => {
  let start = Date.now();
  const relatedTracks = `SELECT * FROM related WHERE id=${id}`;
  client.query(relatedTracks, (err, res) => {
    if(err) console.log(err);
    let ref = res.rows[0];
    const retrieveSongs = `SELECT * FROM songs WHERE id=${ref.songa} OR id=${ref.songb} OR id=${ref.songc}`;
    client.query(retrieveSongs, (err, res) => {
      if(err) console.log(err);
      timing.push(Date.now()-start);
      count++;
      if(count < 1000) {
        let rand = Math.round(Math.random()*10000000);
        getRelatedTracks(rand);
      } else {
        console.log(average(timing));
        client.end();
      }
    })
  })
}

getTrackSingle = (id) => {
  let start = Date.now();
  const get =`SELECT * FROM songs WHERE id=(SELECT songa FROM related WHERE id=${id}) OR id = (SELECT songb FROM related WHERE id=${id}) OR id = (SELECT songc FROM related WHERE id=${id});`;
  client.query(get, (err,res) => {
    if (err) console.log(err)
      timing.push(Date.now()-start);
      count++;
      if(count < 1000) {
        let rand = Math.round(Math.random()*10000000);
        getTrackSingle(rand);
      } else {
        console.log(average(timing));
        client.end();
      }
  })
}

const average = (values) => {
  return values.reduce((total, amount, index, array) => {
    total += amount;
    if (index === array.length-1) {
      return total/array.length;
    } else {
      return total;
    }
  });
}

client.connect();

// getRelatedTracks(1);
// getTrackSingle(1);




/* Queries, for reference:

SELECT songA,songB,songC FROM related WHERE id=1
SELECT * FROM songs WHERE id=15764286 OR id=8973176 OR id=12404584

SELECT dfid from downloads_downloads WHERE dmid IN (
SELECT DISTINCT dmid FROM `downloads_downloads` where dfid = "7024")

EXPLAIN SELECT * FROM songs WHERE id=(SELECT songa FROM related WHERE id=1) OR id = (SELECT songb FROM related WHERE id=1) OR id = (SELECT songc FROM related WHERE id=1);

SELECT * FROM songs WHERE id=(SELECT songa FROM related WHERE id=10000000) OR id = (SELECT songb FROM related WHERE id=10000000) OR id = (SELECT songc FROM related WHERE id=10000000);
*/
