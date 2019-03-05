const database = require('./db/db.js');
const CONFIG = require('../config.js');
const express = require('express');
const server = express();
const path = require('path');
const port = CONFIG.SERVER.PORT;

//********************** SERVER ROUTES **********************

const route = {
  serveClient: () => {
    server.use('/song/:songID', express.static(path.join(__dirname, '../dist/')));
  },
  serveSongs: () => {
    server.get('/api/song/:id/relatedtracks', (req, res) => {
      let id = req.params.id;
      database.getSongs(id)
        .then(songs => {
          res.send(convert.format(songs.rows)).status(200).end();
        })
        .catch(err => {
          console.log(err);
          res.status(500).end();
        })
    })
  },
  createSong: (record) => {
    server.post('/api/song/:id', (req, res) => {
      let id = req.params.id;
      let term = ``; //TODO: define SQL command
      database.create(id, term)
        .then(() => {}) //TODO: success code (201)
        .catch((err) => {});//TODO: failure status codes
    });
  },
  readSong: () => {
    server.get('/api/song/:id', (req, res) => {
      let id = req.params.id;
      database.read(id)
        .then(() => {})  //TODO: success code (200), send record
        .catch(() => {});//TODO: failure status codes
    });
  },
  updateSong: () => {
    server.put('/api/song/:id', (req, res) => {
      let id = req.params.id;
      let newRecord = null; //TODO: define document
      database.update(id, newRecord)
        .then(() => {})//TODO: success code (200? 202?), send record
        .catch(() => {});//TODO: failure status codes
    });
  },
  deleteSong: () => {
    server.delete('/api/song/:id', (req, res) => {
      let id = req.params.id;
      database.delete(id)
        .then(() => {}) //TODO: success code?
        .catch(() => {}) //TODO: error code/response
    })
  },
};

//************** SERVER-SIDE PROCESSING FUNCTIONS **************

const convert = {
  format: (data) => {
    data.forEach(song => {
      song.album_pic = `https://s3.amazonaws.com/sdc-dbcloud/images/${song.album_pic}.jpg`;
      song.user_pic = `https://s3.amazonaws.com/sdc-dbcloud/images/${song.user_pic}.jpg`;
      song.user = {
        pic: song.user_pic,
        username: song.username
      };
    });
    return data;
  }
}

//********************** SECURITY CONFIG **********************

const cors = () => {
  if (CONFIG.CORS.ENABLED) {
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', `${CONFIG.CORS.ORIGIN}`);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', `${CONFIG.CORS.METHODS}`);
      console.log(`CORS has been enabled for the server`);
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      next();
    });
  } else {
      console.log(`Warning: server is not allowing CORS`);
  }
}

//********************** START SERVER **********************
((initialize) => {
  //SECURITY:
  cors();

  //CLIENT:
  route.serveClient();
  route.serveSongs();

  //CRUD: TODO: enable these
  route.readSong();
  route.updateSong();
  route.deleteSong();
  route.createSong();

  //EXPOSE:
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})();
