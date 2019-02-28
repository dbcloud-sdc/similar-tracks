/* The module loads, and then calls three endpoints via GET, which each request:
1) All users, all fields
2) All songs, all fields
3) All playlists, all fiels

After the data has been returned, the program performs some actions on the data,
[users, songs, playlists]:

1) creates a CONST variable called USERLOOKUP, which generates an object
where each key is a username, and the value is the entire user object from
earlier.

2) SONGS: Appends the entire USER object to a new parameter called user on
songs.

3) PLAYLISTS: Appends the entire USER object to a new parameter called user on

So at this point we have state variables:

A: users: which is a full list of every single user in the entire database w/ every column
B: songs: which is a full list of every single song from that user w/ every column
    AND it has a new parameter, 'user', which contains the user data from users
C: playlist: which is a full list of every single playlist in the entire database w/ every column
    AND it has a new parameter, 'user', which contains the user data from users
D: songPlaying: window.location.pathname which is '/song/:songID'
E: currentlySelected: songs[0]
    NOTE: this currentlySelected only requires the num_likes from songs[0]
          however, this relationship must obviously be maintained.


********************************************************************************
Tracing the usage of data:
BubbleList: 
  this.props.likes* (from current track)
  this.props.users.map
  --> user.username
  --> user.pic
  this.props.users
  --> user.username

  UserProfile user={user}
    --> this.props.user.pic
    --> this.props.user.username

TODO: HARDCODE THE BELOW SUMMARY:
9 entries array of objects: .username, .pic is needed.  Store under this.state.users
*/

this.state.users = [{
  username: string,
  pic: url
}];

/*
PlaylistList:
Needs an array of 3 playlists, which are mapped to:
    PlaylistListItem
        .num_likes
        .num_reposts
        .user
            .username
        .title
        .pic
        UserProfile (gets full user):
            .username
            .pic

TODO: HARDCORE THE BELOW SUMMARY
3 entry array of objects:
*/

this.state.playlists = [{
  num_likes: number,
  num_reposts: number,
  title: string,
  pic: url/string,
  user: {
    username: string,
    pic: url/string
  }
}];

/*
Tracklist
  this.state.songs
  --> an array of three entries
  this.selectSong
  --> the current selected song
  BOTH of the above are re-passed down to TrackListItem:
  ---> a single track at a time
  ---> id = track.id (unique react prop, not needed)
  ---> select = this.select
    TrackListItem:
    track:
      .num_plays
      .num_likes
      .num_reposts
      .num_comments
      .title
      .album_pic
      .user: {.username, .pic} <--- used in some subcomponents too
*/

this.state.songs = [{
  title: string,
  album_pic: url/string,
  num_plays: num,
  num_likes: num,
  num_reports: num,
  num_comments: num,
  user: {
    username: string,
    pic: url}
}];