import React from "react";

import TracksListHeader from "./TracksListHeader";
import ListSeparator from "./ListSeparator";
import TrackListItem from "./TrackListItem";
import Grey from "./Grey";

export default class TrackList extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: "55%" }}>
        <Grey><TracksListHeader /></Grey>
        <ListSeparator />
        <div className="headpad">
          {this.props.tracks.map(track => <TrackListItem
            select={this.props.select}
            track={track}
            key={track.id}
          />)
          }
        </div>
      </div>
    );
  }
}
