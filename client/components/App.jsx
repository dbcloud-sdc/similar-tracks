import React from 'react';
import styles from './styles.css';
import Grey from './Grey'
import ProfileImage from './ProfileImage';
import TrackImage from './TrackImage';

import LikesLabel from './LikesLabel';
import PlaysLabel from './PlaysLabel';
import CommentsLabel from './CommentsLabel';
import RepostsLabel from './RepostsLabel';

import StatsBar from './StatsBar';

import TrackListItem from './TrackListItem';

import { generateSongs } from '../dataGenerators/song.mjs';
import { generateUsers } from '../dataGenerators/user.mjs';
import { generatePlaylists } from '../dataGenerators/playlist.mjs';
import TrackList from './TrackList';
import PlaylistList from './PlaylistList';

import BubbleList from "./BubbleList";
import LikesListHeader from './LikesListHeader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: generateSongs(3),
      users: generateUsers(9),
      playlists: generatePlaylists(3),
    }
    console.log(this.state.users);
    console.log(this.state.songs);
  }
  render() {
    return (
      <div className='app'>
        <TrackList tracks={this.state.songs} />
        <PlaylistList playlists={this.state.playlists} />
        <div>
          {<BubbleList imageURIs={this.state.users.map(user => user.pic)} />}
        </div>
      </div>
    )
  }
}

export default App;