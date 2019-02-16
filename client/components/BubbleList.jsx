import React from "react";
import ProfileImage from "./ProfileImage";
import Grey from './Grey'
import LikesLabel from "./LikesLabel";
import LikesListHeader from "./LikesListHeader";
import ListSeparator from './ListSeparator'

export default class BubbleList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{ width: "55%" }}>
        <Grey><LikesListHeader /></Grey>
        <ListSeparator />
        <div class="bubbles">
          {this.props.imageURIs.map((imageURI, index) => <ProfileImage src={`url("${imageURI}")`} style={{
            height: "40px",
            width: "40px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "white",
            display: "inline-block",
            position: "absolute",
            left: `${index * 2}em`,
          }} />)}
        </div>
      </div>

    )
  }
};
