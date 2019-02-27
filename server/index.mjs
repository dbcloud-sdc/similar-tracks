import express from 'express';
import CONFIG from '../config.js';



import express from 'express';
import mysql from 'mysql';
import path from 'path';
import cors from 'cors';

const connection = mysql.createConnection({
  host: 'rightstuff.cvojhsq84htk.us-east-2.rds.amazonaws.com',
  user: 'rightstuff',
  password: 'servicepony',
  database: 'rightbar',
});

const app = express();
app.use(express.json());
// app.use(express.static('dist'));
// app.use('/song/:songID');
const __dirname = path.resolve();

app.use(cors());


app.use(express.static(path.join(__dirname, '/dist')));
app.use('/song/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// static server here for dist files in production...

// endpoints


// api/users
app.get('/api/song/:id/users', (req, res) => {
  // do a SELECT * from the database
  connection.query('select * from users', (err, dbres) => {
    if (err) {
      res.json(err);
    }
    res.json(dbres);
  });
});

// api/songs
app.get('/api/song/:id/relatedtracks', (req, res) => {
  // do a SELECT * from the database
  const primarySongId = req.params.id;
  const randomNumber = () => Math.floor(Math.random() * 100 + 1);

  console.log(primarySongId);
  connection.query(`select * from songs where id in (${randomNumber()}, ${randomNumber()}, ${randomNumber()})`, (err, dbres) => {
    if (err) {
      console.log('err', err);
      res.json(err);
    }
    console.log('res', dbres);
    res.json(dbres);
  });
});

// api/playlists
app.get('/api/song/:id/playlists', (req, res) => {
  // do a SELECT * from the database
  connection.query('select * from playlists', (err, dbres) => {
    if (err) {
      res.json(err);
    }
    res.json(dbres);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
