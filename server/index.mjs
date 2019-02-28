import express from 'express';
import mysql from 'mysql';
import path from 'path';
import cors from 'cors';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
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

//* ************************* NEW ENDPOINTS **************************** *//

app.get('/api/song/:id/', (req, res) => {
  connection.query(`select ${params.id} from songs`, (err, dbres) => {
    if (err) {
      res.json(err);
    }
    res.status(200).json(dbres);
  });
});

app.put('/api/song/:id/', (req, res) => {
  //NOTE: for PUT/UPDATE, data validation should occur with an option to return an error BAD REQUEST (400)
  //not worth doing right now

  //the below might be an async wait, but I don't want to worry about that right now since it wont be used.
  let song = req.data;

  let updateString = '';
  for (let key in song) {
    updateString += `${key} = ${song[key]},`;
  }

  let sql = `UPDATE songs SET (${updateString}) WHERE id = ${params.id}`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(200).end();
  });
});

app.post('/api/song/:id/', (req, res) => {
  let song = req.data;
  let sql = `INSERT INTO songs(${Object.keys(song).slice(1).join(',')}) VALUES(${Object.values(song).slice(1).map(value => (!isBoolean(value) ? `"${value}"` : value ? '1' : '0')).join(',')})`;
  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(201).end();
  });
});

app.delete('/api/song/:id/', (req, res) => {
  connection.query(`DELETE ${params.id} FROM songs`, (err, dbres) => {
    if (err) {
      res.status(500).end();
    }
    //TODO: this should be a status code
    res.status(200).end();
  });
});
//* ************************* OLD ENDPOINTS **************************** *//

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
