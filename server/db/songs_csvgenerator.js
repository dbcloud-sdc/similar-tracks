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
    this.document = 'id,song_id,title,album_pic,username,user_pic,num_likes,num_comments,num_reposts\n'; //start with the headers
  }

  _read() {
    const end = this.records + 1000;
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
    data.push(id+1);    
    data.push(id+1);                                              //id, start at 1    //id, start at 1
    data.push(faker.lorem.words(Math.ceil(Math.random() * 2))); //song title
    data.push(`${Math.round(Math.random()*1000)}`);         //album picture
    data.push(faker.internet.userName());                       //username
    data.push(`${Math.round(Math.random()*1000)}`);         //user_pic
    let popularity = Math.ceil(Math.random()*(2)+3);            //scales the song randomizer
    data.push(this.distributedNumber(popularity,100000));       //num_likes
    data.push(this.distributedNumber(popularity,10000));        //num_comments
    data.push(this.distributedNumber(popularity,10000));        //num_reposts
    //convert to CSV row format:
    this.document += `${data[0]},${data[1]},${data[2]},${data[3]},${data[4]},${data[5]},${data[6]},${data[7]},${data[8]}\n`;
  }
}

const destination = path.join(__dirname, 'songs_table.csv');
const stream = fs.createWriteStream(destination)

const readStream = new Generate();
readStream.pipe(stream);
