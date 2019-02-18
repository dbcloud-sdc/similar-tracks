import React from "react";
import IconLabel from "./IconLabel";
import InPlaylistLabel from "./InPlaylistsLabel";

export default class PlaylistListHeader extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span style={{ align: "left" }}>
          <InPlaylistLabel />
        </span>
        <span style={{ float: "right" }}>
          View All
        </span>
      </div>
    );
  }
}
