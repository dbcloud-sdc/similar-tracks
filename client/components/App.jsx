import React from 'react';
import styles from './styles.css';

import TrackList from './TrackList';
import PlaylistList from './PlaylistList';

import BubbleList from "./BubbleList";
import TracksHover from "./TracksHover";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      songs: [],
      users: [],
      playlists: [],
      currentlySelected: { num_likes: undefined }
    }

    this.selectSong = this.selectSong.bind(this)
  }


  selectSong(song) {
    console.log(song);
    this.setState({ currentlySelected: song })
  }

  // return a promise that resolves once our express server returns the users
  getUsersPromise() {
    return fetch("http://localhost:3000/api/users")
      .then(response => response.json())
  }

  // and for the songs
  getSongsPromise() {
    return fetch("http://localhost:3000/api/songs")
      .then(response => response.json())
  }

  // and for the playlists
  getPlaylistsPromise() {
    return fetch("http://localhost:3000/api/playlists")
      .then(response => response.json())
  }

  // return a promise that resolves when *all* the other promises resolve
  getDataPromise() {
    return Promise.all([this.getUsersPromise(), this.getSongsPromise(), this.getPlaylistsPromise()]);
  }

  // make the request to all the endpoints (users, songs, playlists)
  fetchData() {
    this.getDataPromise()
      .then(([users, songs, playlists]) => {

        // compute a user lookup table by username, i.e.: {username0: user0, username1: user1 ...}
        // we need this to be able to show the tooltip with the user profile from the track list and playlist list
        const userlookup = users.reduce((userlookup, user) => {
          userlookup[user.username] = user;
          return userlookup;
        }, {});

        // console.log(userlookup)

        //put the users on the songs
        songs = songs.map(song => {
          return { ...song, user: userlookup[song.username] }
        })

        // put the users on the playlists
        playlists = playlists.map(playlist => {
          return { ...playlist, user: userlookup[playlist.username] }
        });

        // now that we have our augmented data, set the state with it.
        this.setState({
          users: users,
          songs: songs,
          playlists: playlists,

          // set the currently selected to the first one in the list
          currentlySelected: songs[0]
        })
      })
  }

  componentDidMount() {
    this.fetchData(this.addUsersToSongsAndPlaylists);
  }

  render() {
    return (
      <div className='app'>
        {/* app is pretty simple, just a track list, a playlist, and our user likes */}
        <TrackList select={this.selectSong} tracks={this.state.songs.slice(0, 3)} />
        <PlaylistList playlists={this.state.playlists.slice(0, 3)} />
        <BubbleList likes={this.state.currentlySelected.num_likes} users={this.state.users.slice(0, 9)} />
      </div>
    )
  }
}

export default App;