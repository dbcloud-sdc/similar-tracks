/* -------------------------------------------------------*/
/*                      CREATE MAIN TABLES                */
/* -------------------------------------------------------*/

create database if not exists zoundloud;

use zoundloud;


drop table if exists playlists;
drop table if exists songs;
drop table if exists users;


create table if not exists users (
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

/* -------------------------------------------------------*/
/*                      CREATE MAIN TABLES                */
/* -------------------------------------------------------*/

-- create table if not exists albums (
--   id int not null auto_increment,
--   pic varchar(110) not null, 
--   title varchar(50) not null,
--   num_likes int default null, 
--   num_reposts int default null,
--   artist_id int default null,
--   primary key(id),
--   foreign key(artist_id) references artist(id)
-- );