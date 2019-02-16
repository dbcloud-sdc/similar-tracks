import React from "react";

import PlaylistListHeader from "./PlaylistListHeader";
import ListSeparator from "./ListSeparator";
import PlaylistListItem from "./PlaylistListItem";
import Grey from "./Grey";

export default class PlaylistList extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: "50%" }}>
        <Grey><PlaylistListHeader /></Grey>
        <ListSeparator />
        <div className="headpad">
          {this.props.playlists.map(playlist => <PlaylistListItem playlist={playlist} />)}
        </div>
      </div>
    );
  }
}
