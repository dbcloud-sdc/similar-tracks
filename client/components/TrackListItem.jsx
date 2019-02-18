import React from "react";
import StatsBar from "./StatsBar";
import TrackImage from "./TrackImage";
import Grey from "./Grey";
import ReactTooltip from "react-tooltip";
import UserProfile from "./UserProfile";
import HeartBox from "./HeartBox";
import Dots from "./Dots";

export default class TrackListItem extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    }

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    // check to see if we are already in the right state
    // that way we dont set state if we dont need to
    // this avoids triggering expensive rerenders
    if (!this.state.isSelected) {
      this.setState({ isSelected: true });
    }
  }

  handleMouseOut() {
    this.setState({ isSelected: false });
  }

  render() {
    const { num_plays, num_likes, num_reposts, num_comments, user, title } = this.props.track;
    return (
      <div style={{ margin: ".5em", marginLeft: "0em" }} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={() => { this.props.select(this.props.track); }}>
        <span>
          <TrackImage
            src={`url("${this.props.track.album_pic}")`}
            style={{ float: "left", marginRight: ".5em" }}
            isSelected={this.state.isSelected}
          />
        </span>
        <span>
          <div className="nexttopic" data-tip data-for={`${user.username}`}>
            <Grey>{user.username}</Grey>
          </div>
          <ReactTooltip delayHide={100}
            delayShow={100}
            delayUpdate={100}
            type={"light"}
            border={true}
            effect={'solid'}

            id={`${user.username}`}
            style={{ color: "#ff6e00 !important" }} >
            <UserProfile user={user}></UserProfile>
          </ReactTooltip>
          <div className="nexttopic">
            <span style={{
              display: "inline-block",
              width: "50%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}>{title}</span>
            <span style={{ display: "inline-block", position: "absolute", float: "right", clear: "right" }}>
              <HeartBox style={{ zIndex: 1, display: "inline-block" }} isSelected={this.state.isSelected}></HeartBox>
              <Dots style={{ zIndex: 1, display: "inline-block" }} isSelected={this.state.isSelected}></Dots>
            </span>
          </div>
          <div className="nexttopic">
            <Grey className="nexttopic"><StatsBar plays={num_plays} likes={num_likes} reposts={num_reposts} comments={num_comments} /></Grey>
          </div>
        </span>
      </div >
    );
  }
}
