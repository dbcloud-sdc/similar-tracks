import React from 'react';
import styles from './styles.css';
import TrackList from './TrackList';
import PlaylistList from './PlaylistList';
import BubbleList from "./BubbleList";
import TracksHover from "./TracksHover";
import HCDATA from '../hcdata.js'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      users: HCDATA.users,
      playlists: HCDATA.playlists,
      currentlySelected: { num_likes: undefined },
      songPlaying: 1
    }

    this.fetchData = this.fetchData.bind(this);
    this.selectSong = this.selectSong.bind(this)
  }

  selectSong(song) {
    this.setState({ currentlySelected: song })
  }

  getSongs() {
    const id = window.location.pathname
    return fetch(`http://localhost:8081/api${id}relatedtracks`)
      .then(response => {
        return response.json()
      }
      )
  }

  fetchData() {
    this.getSongsPromise()
      .then((songs) => {
        this.setState({
          songs: songs,
          songPlaying: window.location.pathname,
          currentlySelected: songs[0]
        })
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className='app'>
        <TrackList select={this.selectSong} tracks={this.state.songs} />
        <PlaylistList playlists={this.state.playlists} />
        <BubbleList likes={this.state.currentlySelected.num_likes} users={this.state.users} />
      </div>
    )
  }
}

export default App;