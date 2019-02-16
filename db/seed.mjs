import mysql from 'mysql';
import { isBoolean } from 'util';
import { generateSongs } from '../client/dataGenerators/song.mjs';
import { generateUsers } from '../client/dataGenerators/user.mjs';
import { generatePlaylists } from '../client/dataGenerators/playlist.mjs';


const data = {
  songs: generateSongs(100),
  users: generateUsers(100),
  playlists: generatePlaylists(100),
};

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'zoundloud',
});

connection.connect();


/*
INSERT INTO users(field0, field1, ...) VALUES(value0, value1, ...)
*/


data.users.forEach((user) => {
  const sql = `INSERT INTO users(${Object.keys(user).slice(1).join(',')}) VALUES(${Object.values(user).slice(1).map(value => (!isBoolean(value) ? `"${value}"` : value ? '1' : '0')).join(',')})`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
});


data.songs.forEach((song) => {
  const sql = `INSERT INTO songs(${Object.keys(song).slice(1).join(',')}) VALUES(${Object.values(song).slice(1).map(value => (!isBoolean(value) ? `"${value}"` : value ? '1' : '0')).join(',')})`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
});

data.playlists.forEach((playlist) => {
  const sql = `INSERT INTO playlists(${Object.keys(playlist).slice(1).join(',')}) VALUES(${Object.values(playlist).slice(1).map(value => (!isBoolean(value) ? `"${value}"` : value ? '1' : '0')).join(',')})`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
});
connection.end();
