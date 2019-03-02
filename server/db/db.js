const CONFIG = require('../../config.js');
const pg = require('pg');
const copyFrom = require('pg-copy-streams').froml

const client = new pg.Client({
  user: CONFIG.POSTGRES.USER,
  host: CONFIG.POSTGRES.URL,
  database: CONFIG.POSTGRES.DBNAME,
  password: CONFIG.POSTGRES.PASS,
  port: CONFIG.POSTGRES.PORT,
});


const dropTables = `DROP TABLE IF EXISTS songs, related`;

const createSongTable = `
          CREATE TABLE "songs" (
            "id" SERIAL PRIMARY KEY,
            "song_id" int,
            "title" varchar(50),
            "album_pic" int,
            "username" varchar(25),
            "user_pic" int,
            "num_likes" int,
            "num_comments" int,
            "num_reposts" int
          )`

const addRow =
`INSERT INTO songs(song_id,title,album_pic,username,user_pic,num_likes,num_comments,num_reposts)
            VALUES(1,'test',3,'username',5,6,7,8);
`;

console.log(addRow);

console.log('fun begins')
client.connect();
client.query(dropTables, (err,res) => {
  if(err) {
    console.log(err)
  } else {
    console.log('tables dropped');
    client.query(createSongTable, (err, res) => {
      if (err) console.log(err);
      else {
        console.log('table created successfully');
        client.query(addRow, (err) => {
          if (err) console.log(err);
          else {
            console.log('added');
            client.end();
          }
        })
      }
    })
  }
})




//TODO: in the morning, try to fix this hot garbage
//TODO: spend more time looking into pg, postgres, and
//TODO: take steps one at a time before getting complex.
//TODO: spend more time in the
// async function populateDatabase () {
//   await client.connect();
//   try {
//     await client.query(dropTables);
//     client.query(createSongTable);
//     await client.end();

//   } catch (err) {
//     console.log(err);
//   }

//   //await client.query(addRow);
//   // await client.query(`SELECT * FROM songs`, (err, res) => {
//   //   if(err) console.log(err);
//   //   console.log(res);
//   // });

// }

// populateDatabase();

//var stream = client.query(copyFrom('COPY '))


// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })




// pg.connect(function(err, client, done) {
//   var stream = client.query(copyFrom('COPY my_table FROM STDIN'));
//   var fileStream = fs.createReadStream('some_file.tsv')
//   fileStream.on('error', done);
//   fileStream.pipe(stream).on('finish', done).on('error', done);
// });


/*
  const DB = {
    getSongs: (id) => {
      //placeholder
      return new Promise();
    },
    create: (id, record) => {
      //placeholder
      return new Promise();
    },
    read: (id) => {
      //placeholder
      return new Promise();
    },
    update: (id, record) => {
      //placeholder
      return new Promise();
    },
    delete: (id) => {
      return new Promise();
    }
  };

  export default DB;
*/