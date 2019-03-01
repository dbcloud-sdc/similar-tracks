const faker = require('faker');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

class Generate extends Readable {
  constructor(generator) {
    super();
    //variables go here
    this.generator = generator; //the provided generator function

    this.dataSetTarget = 30000000;
    this.records = 0;
    this.document = 'id,title,album_pic,username,user_pic,num_likes,num_comments,num_reposts\n'; //start with the headers
  }

  _read() {
    const end = this.records + 100;
    if (this.records === this.dataSetTarget) {
      this.push(null); //complete the readable stream.
    } else {
      //make 100 rows at a time
      for (let i = this.records; i < end; i++) {
        this.songRecord(i);
        this.records++;
      }
      //push these 100 into the read stream
      this.push(this.document);
      //reset the document:
      this.document = '';
    }
  }

  distributedNumber(n, max) {
    let rand = Math.random();
    for (let i = 1; i < n; i++) {
      rand *= Math.random();
    }
    return Math.round(rand*max);
  }

  songRecord(id) {
    let data = [];
    data.push(id);                                              //id
    data.push(faker.lorem.words(Math.ceil(Math.random() * 2))); //song title
    data.push(`${Math.round(Math.random()*1000)}.jpg`);         //album picture
    data.push(faker.internet.userName());                       //username
    data.push(`${Math.round(Math.random()*1000)}.jpg`);         //user_pic
    let popularity = Math.ceil(Math.random()*(2)+3);            //scales the song randomizer
    data.push(this.distributedNumber(popularity,100000));       //num_likes
    data.push(this.distributedNumber(popularity,10000));        //num_comments
    data.push(this.distributedNumber(popularity,10000));        //num_reposts
    //convert to CSV row format:
    this.document += `${data[0]},${data[1]},${data[2]},${data[3]},${data[4]},${data[5]},${data[6]},${data[7]}\n`;
  }
}

const destination = path.join(__dirname, 'data.csv');
const stream = fs.createWriteStream(destination)

const readStream = new Generate();
readStream.pipe(stream);

//CONFIGURE:
// const dataSetTarget = 30000000;
// const bufferRate = 30000;
// const steps = dataSetTarget/bufferRate;

// const generateSongs = () => {
//   stream.write(headers);
//   for (let i = 0; i < steps; i++) {
//     console.log(`Progress is ${100*(i/steps)}%`);
//     let rowCollector = '';
//     for (let j = 0; j < bufferRate; j++) {
//       let data = fake(1+j+i*bufferRate);
//       rowCollector += `${data[0]},${data[1]},${data[2]},${data[3]},${data[4]},${data[5]},${data[6]},${data[7]}\n`;
//     }
//     stream.write(rowCollector);
//   }
//   console.log(`Process is complete`);
//   stream.end();
// }



// const distributedNumber = (n, max) => {
//   let rand = Math.random();
//   for (let i = 1; i < n; i++) {
//     rand *= Math.random();
//   }
//   return Math.round(rand*max);
// }

//for reference
// const baseUrl = 'https://s3.amazonaws.com/sdc-dbcloud/images/';

// const fake = (id) => {
//   let data = [];
//   data.push(id);   //id
//   data.push(faker.lorem.words(Math.ceil(Math.random() * 2))); //song title
//   data.push(`${Math.round(Math.random()*1000)}.jpg`);         //album picture
//   data.push(faker.internet.userName());                       //username
//   data.push(`${Math.round(Math.random()*1000)}.jpg`);         //user_pic
//   let popularity = Math.ceil(Math.random()*(2)+3);
//   data.push(distributedNumber(popularity,100000));            //num_likes
//   data.push(distributedNumber(popularity,10000));             //num_comments
//   data.push(distributedNumber(popularity,10000));             //num_reposts
//   return data;
// }

// console.log(fake(1));
// let start = Date.now();
// generateSongs();
// let stopSongs = Date.now();
// console.log(`Song generation total ms: ${stopSongs-start}`);
