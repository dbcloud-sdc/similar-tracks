// const database = require('./db/db.js');
const CONFIG = require('../config.js');
const express = require('express');
const server = express();
const path = require('path');
const controller = require('./controllers/controller.js');
const port = CONFIG.SERVER.PORT;

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
  //SECURITY & CONFIGURATION:
  cors();
  server.use(express.json());

  //Allow serving the client:
  server.use('/song/:songID', express.static(path.join(__dirname, '../dist/')));

  //Primary API call from client:
  server.get('/api/song/:id/relatedtracks', controller.relatedTracks);

  //CRUD operations on primary table (related tracks):
  server.post('/api/related/:id', controller.createRelation);
  server.get('/api/related/:id', controller.readRelation);
  server.put('/api/related/:id', controller.updateRelation);
  server.delete('/api/related/:id', controller.deleteRelation);

  //EXPOSE:
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})();
