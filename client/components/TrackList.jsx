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
      <div style={{ width: "50%" }}>
        <Grey><TracksListHeader /></Grey>
        <ListSeparator />
        <div>
          {this.props.tracks.map(track => <TrackListItem track={track} />)}
        </div>
      </div>
    );
  }
}
