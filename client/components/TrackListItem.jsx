import React from "react";
import StatsBar from "./StatsBar";
import TrackImage from "./TrackImage";
import Grey from "./Grey";
export default class TrackListItem extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    const { num_plays, num_likes, num_reposts, num_comments, username, title } = this.props.track;
    return (
      <div style={{ margin: ".5em", marginLeft: "0em" }}>
        <span>
          <TrackImage src={`url("${this.props.track.album_pic}")`} style={{ float: "left", marginRight: ".5em" }} />
        </span>
        <span>
          <div className="nexttopic">
            <Grey>{username}</Grey>
          </div>
          <div className="nexttopic">
            {title}
          </div>
          <div className="nexttopic">
            <Grey className="nexttopic"><StatsBar plays={num_plays} likes={num_likes} reposts={num_reposts} comments={num_comments} /></Grey>
          </div>
        </span>
      </div>
    );
  }
}
