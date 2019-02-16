import React from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: generateSongs(5),
      users: generateUsers(10),
      playlists: generatePlaylists(6),
    }
    console.log(this.state.users);
    console.log(this.state.songs);
  }
  render() {
    return (
      <div>
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