const fs = require('fs');
const path = require('path');
const axios = require('axios');
const uri = 'https://loremflickr.com/50/50/';
const productTypes = ['album','music','electronic','rock','landscape','modern','song','dance'];

const generateImages = (num) => {
  for (let i = 1; i <= num; i++) {
    let songID = i;
    let destination = path.join(__dirname, `/images/`);
    let type = randType();
    let filename = `${songID}.jpg`;
    let url = uri + type;

    axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    })
      .then((res) => {
        res.data.pipe(fs.createWriteStream(destination+filename));
      }).catch((err) => {
        console.error(err);
        console.log(`${url} failed`);
      });
  }
};

const randType = () => {
  let index = Math.floor(Math.random() * productTypes.length);
  return productTypes[index];
};

generateImages(1000);
