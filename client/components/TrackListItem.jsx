import React from 'react';
import SongImage from './SongImage';

class TrackListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { plays, likes, reposts, comments, username, title } = this.props.song
    return (
      <div>
        <span>
          <SongImage />
        </span>
        <span>
          <div>

          </div>
          <div>

          </div>
          <div>

          </div>
        </span>
      </div>
    )
  }
}