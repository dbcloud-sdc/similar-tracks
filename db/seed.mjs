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

// replace the username property in the songs with a random username from the users
data.songs = data.songs.map(song => ({
  id: song.id,
  ...song,
  username: data.users[Math.floor(Math.random() * data.users.length)].username,
}));

// replae the username property in the playlists with a random username from the users
data.playlists = data.playlists.map(playlist => ({
  id: playlist.id,
  ...playlist,
  username: data.users[Math.floor(Math.random() * data.users.length)].username,
}));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'zound',
  multipleStatements: true,
});

function recreateTables(seedDataCallback) {
  /* dump the entire DB and reseed */
  const DROP_TABLES_SQL = `drop table if exists playlists;
drop table if exists songs;
drop table if exists users;
`;

  const CREATE_TABLES_SQL = `create table if not exists users (
  id int not null auto_increment, 
  username varchar(63) not null,
  followers int default 1,
  pic varchar(511) not null, 
  city varchar(255) default null,
  ustate varchar(255) default null,
  country varchar(255) default null,
  pro_user boolean not null,
  primary key(id)
);
create table if not exists songs (
  id int not null auto_increment, 
  title varchar(63) not null,
  album_pic varchar(511) not null, 
  user_id int not null,
  username varchar(255) not null,
  num_plays int default null,
  num_likes int default null, 
  num_reposts int default null,
  num_comments int default null,
  album_id int default null,
  playlistid int default null,
  primary_song_id int not null,
  primary key(id),
  foreign key (user_id) references users(id)
);
create table if not exists playlists (
  id int not null auto_increment,
  username varchar(63) not null,
  pic varchar(127) not null, 
  title varchar(63) not null,
  num_likes int default null, 
  num_reposts int default null,
  song_id int default null,
  primary key(id),
  foreign key(song_id) references songs(id)
);
`;

  connection.query(DROP_TABLES_SQL, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(CREATE_TABLES_SQL, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          seedDataCallback();
        }
      });
    }
  });
}
/*
INSERT INTO users(field0, field1, ...) VALUES(value0, value1, ...)
*/

function seedData() {
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
}

connection.connect();
recreateTables(seedData);
setTimeout(() => connection.end(), 5000);
