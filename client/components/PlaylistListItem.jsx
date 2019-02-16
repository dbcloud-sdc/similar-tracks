import React from "react";
import StatsBar from "./StatsBar";
import TrackImage from "./TrackImage";
import Grey from "./Grey";
export default class PlaylistListItem extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    const { num_likes, num_reposts, username, title } = this.props.playlist;
    return (
      <div style={{ margin: ".5em", marginLeft: "0em" }}>
        <span>
          <TrackImage src={`url("${this.props.playlist.pic}")`} style={{ float: "left", marginRight: ".5em" }} />
        </span>
        <span>
          <div>
            <Grey>{username}</Grey>
          </div>
          <div>
            {title}
          </div>
          <div>
            <Grey><StatsBar likes={num_likes} reposts={num_reposts} /></Grey>
          </div>
        </span>
      </div>
    );
  }
}
