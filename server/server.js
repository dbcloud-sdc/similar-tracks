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

  serveSongs: () => { //This is the microservice endpoint.
    server.get('/api/song/:id/relatedtracks', (req, res) => {
      let id = req.params.id;
      database.getRelatedSongs(id)
        .then(songs => {
          res.send(convert.format(songs.rows)).status(200).end();
      }).catch(err => {
          console.log('Failure retrieving related tracks from the database:');
          console.log(err);
          res.status(500).end();
      });
    });
  },

  createRelation: () => {
    server.post('/api/related/:id', (req, res) => {
      let id = req.params.id;
      console.log(req.body);
      let relationship = null; //TODO: process the req.body
      let term = ``; //TODO: define SQL command
      database.create(id, term)
        .then(() => {}) //TODO: success code (201)
        .catch((err) => {});//TODO: failure status codes
    });
  },

  readRelation: () => {
    server.get('/api/related/:id', (req, res) => {
      let id = req.params.id;
      let term = ``; //TODO: define SQL command
      database.read(id)
        .then(() => {})  //TODO: success code (200), send record
        .catch(() => {});//TODO: failure status codes
    });
  },

  updateRelation: () => {
    server.put('/api/related/:id', (req, res) => {
      let id = req.params.id;
      let relationship = req.body;
      if(validate.relationUpdate(relationship, id)) {
        let term = convert.toUpdateQuery(relationship);
        console.log(term);
        database.update(id, newRecord)
          .then(() => {})//TODO: success code (200? 202?), send record
          .catch(() => {});//TODO: failure status codes
      } else {
        console.log('Rejecting invalid update request');
        res.status(422).end();
      }
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
  },
  toUpdateQuery: (data) => {
    //need to determine what parameters exist on data,
    //it can be songa, songb, and/or songc
    //then generate a postgreSQL query and return it as a string
    let set = '';
    let id = null;
    for (let key in data) {
      if(key === 'id') {
        id = data[key];
      } else {
        set += `${key} = ${data[key]},`;
      }
    }
    set = set.substring(0,set.length-2); //remove trailing comma
    return `UPDATE related SET ${set} WHERE id = ${id};`;
  }
}

const validate = {
  relationUpdate: (relation, id) => {
    //Perform very basic validation.
    //TODO: check input lengths
    const validEntries = {
      'id': 'number',
      'songa': 'number',
      'songb': 'number',
      'songc': 'number'
    };

    if (Number(relation.id) !== Number(id)) {
      console.log(`Inputed ID is ${relation.id} does not match endpoint (${id})`);
      return false;
    }
    if (typeof relation !== 'object') {
      console.log('Update request is not an object');
      return false;
    }
    for (let key in relation) {
      if(!validEntries[key]) {
        console.log(`${key} does not exist in validEntries`);
        return false;
      } else {
        if (typeof relation[key] !== validEntries[key]) {
          console.log(`Typeof ${key} is ${typeof relation[key]} instead of ${validEntries[key]}`);
          return false;
        }
      }
    }
    return true;
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
  //SECURITY & CONFIGURATION:
  cors();
  server.use(express.json()); //TODO: Currently, the server will crash if it doesn't receive JSON...

  //CLIENT:
  route.serveClient();

  //Primary API call from client:
  route.serveSongs();

  //CRUD operations on primary table (related):
  route.createRelation();
  route.readRelation();
  route.updateRelation();
  route.deleteSong();

  //EXPOSE:
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})();
