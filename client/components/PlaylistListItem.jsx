import React from "react";
import StatsBar from "./StatsBar";
import TrackImage from "./TrackImage";
import ReactTooltip from "react-tooltip";
import UserProfile from "./UserProfile";
import Grey from "./Grey";
export default class PlaylistListItem extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    const { num_likes, num_reposts, user, title } = this.props.playlist;
    return (
      <div style={{ margin: ".5em", marginLeft: "0em" }}>
        <span>
          <TrackImage src={`url("${this.props.playlist.pic}")`} style={{ float: "left", marginRight: ".5em" }} />
        </span>
        <span>
          <div className="nexttopic" data-tip data-for={`${user.username}`}>
            <Grey>{user.username}</Grey>
            <ReactTooltip delayHide={100}
              delayShow={100}
              delayUpdate={100}
              type={"light"}
              border={true}
              effect={'solid'}

              key={`${user.username}`}
              id={`${user.username}`}
              style={{ color: "#ff6e00 !important" }} >
              <UserProfile user={user}></UserProfile>
            </ReactTooltip>
          </div>
          <div className="nexttopic">
            {title}
          </div>
          <div className="nexttopic">
            <Grey className="nexttopic"><StatsBar likes={num_likes} reposts={num_reposts} /></Grey>
          </div>
        </span>
      </div>
    );
  }
}
