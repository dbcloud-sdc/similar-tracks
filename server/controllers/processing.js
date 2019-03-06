module.exports = {
  convert: {
    format:  (data) => {
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
  },
  validate: {
    newRelation: (relation) => {
      return (relation[id] && relation[songa] && relation[songb] && relation[songc]);
    },
    relation: (relation, id, post = false) => {
      //Perform very basic validation.
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
      if(post) {
        if(!(relation.hasOwnProperty('songa') && relation.hasOwnProperty('songb') && relation.hasOwnProperty('songc'))) {
          console.log(`Post was rejected due to missing a required property`);
          return false;
        }
      }
      return true;
    }
  }
}
