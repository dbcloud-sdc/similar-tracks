import React from 'react';
import ProfileImage from './ProfileImage';
import { generateSongs } from '../fakeData/fakeSongs';
import { generateUsers } from '../fakeData/fakeUsers';
import { generatePlaylists } from '../fakeData/fakePlayLists';
import SongImage from './SongImage';
import PlaysLabel from './PlaysLabel';
import CommentsLabel from './CommentsLabel';
import LikesLabel from './LikesLabel';
import RepostsLabel from './RepostsLabel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: generateSongs(3),
      users: generateUsers(9),
      playlists: generatePlaylists(3)
    }
    console.log(this.state.songs);
    console.log(this.state.users);
    console.log(this.state.playlists);
  }
  render() {
    return (
      <div>
        {this.state.users.map((user => {
          return (<ProfileImage src={`url('${user.pic}')`} />)
        }))}
        {this.state.songs.map((song => {
          return (
            <SongImage src={`url('${song.album_pic}')`} />
          )
        }))}
        <RepostsLabel reposts={13} />
        <LikesLabel likes={239} />
        <CommentsLabel comments={7} />
        <PlaysLabel plays={64} />
      </div>
    )
  }
}

export default App;