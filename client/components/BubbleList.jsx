import React from "react";
import ProfileImage from "./ProfileImage";
import Grey from './Grey'
import LikesLabel from "./LikesLabel";
import LikesListHeader from "./LikesListHeader";
import ListSeparator from './ListSeparator'
import ReactTooltip from "react-tooltip";
import UserProfile from "./UserProfile";
export default class BubbleList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{ width: "55%" }}>
        <Grey><LikesListHeader likes={this.props.likes} /></Grey>
        <ListSeparator />
        <div className={"bubbles"}>
          {this.props.users.map((user, index) =>
            <ProfileImage data-tip data-for={`${user.username}`} key={user.username} src={`url("${user.pic}")`} style={{
              height: "40px",
              width: "40px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "white",
              display: "inline-block",
              position: "absolute",
              left: `${index * 2}em`,
            }} />)}
          {this.props.users.map(user =>
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
            </ReactTooltip>)}
        </div>
      </div>

    )
  }
};
