const faker = require('faker');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

class Generate extends Readable {
  constructor(generator) {
    super();
    //variables go here
    this.generator = generator; //the provided generator function

    this.dataSetTarget = 10000000;
    this.records = 0;
    this.document = 'id,songA,songB,songC\n'; //start with the headers
  }

  _read() {
    const end = this.records + 1000;
    if (this.records === this.dataSetTarget) {
      this.push(null); //complete the readable stream.
    } else {
      //make 100 rows at a time
      for (let i = this.records; i < end; i++) {
        this.relatedRecord(i);
        this.records++;
      }
      //push these 100 into the read stream
      this.push(this.document);
      //reset the document:
      this.document = '';
    }
  }

  relatedRecord(id) {
    let data = [id+1];
    for (let i = 0; i < 3; i++) {
      let rand = Math.ceil(Math.random()*10000000);
      while (rand === id+1) { //the related song cannot be the same
        console.log('same song found');
        rand = Math.ceil(Math.random()*10000000);
      }
      data.push(rand);
    }
    //convert to CSV row format:
    this.document += `${data[0]},${data[1]},${data[2]},${data[3]}\n`;
  }
}

const destination = path.join(__dirname, 'relations-table.csv');
const stream = fs.createWriteStream(destination)

const readStream = new Generate();
readStream.pipe(stream);
