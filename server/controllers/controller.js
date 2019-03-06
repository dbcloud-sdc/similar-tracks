const database = require('../db/db.js');
const processor = require('./processing.js');

module.exports = {
  //Return three related tracks to the client
  relatedTracks: (req, res) => {
    let id = req.params.id;
    let term = `SELECT * FROM songs WHERE
              id = (SELECT songa FROM related WHERE id=${id})
          OR id = (SELECT songb FROM related WHERE id=${id})
          OR id = (SELECT songc FROM related WHERE id=${id});`;
    database.process(term)
      .then(songs => {
        res.send(processor.convert.format(songs.rows)).status(200).end();
    }).catch(err => {
        console.log('Failure retrieving related tracks from the database:');
        console.log(err);
        res.status(500).end();
    });
  },

  //Create a new relation for a given track
  createRelation: (req, res) => {
    let id = req.params.id;
    let relationship = req.body;
    if (processor.validate.relation(relationship,id,true)) {
      let term = `INSERT INTO related(id, songa, songb, songc)
          VALUES (${id}, ${relationship.songa}, ${relationship.songb}, ${relationship.songc})`;
      database.process(term)
      .then(() => {
        res.status(201).end();
      })
      .catch((err) => {
        console.log(`Error adding new item to ${id}`);
        console.log(err);
        res.status(500).end();
      });
    } else {
      console.log('Rejecting invalid post request');
      res.send(400).end();
    }
  },

  //Return a song's relation IDs for a given track
  readRelation: (req, res) => {
    let id = req.params.id;
    let term = `SELECT songa,songb,songc FROM related WHERE id = ${id};`;
    database.process(term)
      .then((songs) => {
        res.send(songs.rows).status(200).end();
      })
      .catch((err) => {
        console.log(`Error reading ${id}'s related songs`);
        console.log(err);
        res.status(500).end();
      });
  },

  //update a single song's related tracks
  updateRelation: (req, res) => {
    let id = req.params.id;
    let relationship = req.body;
    if(processor.validate.relation(relationship, id)) {
      let term = processor.convert.toUpdateQuery(relationship);
      database.process(term)
        .then(() => {
          console.log(`Successful update of ${id}`);
          res.send(202).end();
        })
        .catch((err) => {
          console.log('Database error updating relation:');
          console.log(err);
          res.status(500).end();
        });
    } else {
      console.log('Rejecting invalid update request');
      res.status(400).end();
    }
  },

  //delete a single song's related tracks
  deleteRelation: (req, res) => {
    let id = req.params.id;
    let term = `DELETE FROM related WHERE id = ${id}`;
    database.process(term)
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.log(`Error deleteing ${id}:`);
        console.log(err);
        res.send(500).end();
      });
  }
}
