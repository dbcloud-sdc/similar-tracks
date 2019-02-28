//NOTE: this is a skeleton/stub file
//Many of the status codes and specific functionality has not been completed.

import CONFIG from '../config.js';
import DB from './db/db.js';
const express = require('express');
const server = express();
const fs = require('fs');
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
      DB.getSongs()
        .then(songs => {
          //TODO: send songs
          //TODO: status codes (200)
        })
        .catch(err => {
          //TODO: error codes
          console.log(err);
        })
    })
  },
  create: () => {
    server.post('/api/song/:id', (req, res) => {
      let id = req.params.id;
      let record = null; //TODO: define document
      DB.create(id, record)
        .then(() => {}) //TODO: success code (201)
        .catch((err) => {});//TODO: failure status codes
    });
  },
  read: () => {
    server.get('/api/song/:id', (req, res) => {
      let id = req.params.id;
      DB.read(id)
        .then(() => {})  //TODO: success code (200), send record
        .catch(() => {});//TODO: failure status codes
    });
  },
  update: () => {
    server.put('/api/song/:id', (req, res) => {
      let id = req.params.id;
      let newRecord = null; //TODO: define document
      DB.update(id, newRecord)
        .then(() => {})//TODO: success code (200? 202?), send record
        .catch(() => {});//TODO: failure status codes
    });
  },
  delete: () => {
    server.delete('/api/song/:id', (req, res) => {
      let id = req.params.id;
      DB.delete(id)
        .then(() => {}) //TODO: success code?
        .catch(() => {}) //TODO: error code/response
    })
  }
};

//************** SERVER-SIDE PROCESSING FUNCTIONS **************

//TODO: not needed for now - placeholder.

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
  //functions here
  cors();
  route.serveClient();
  route.serveSongs();
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})();
