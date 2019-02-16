import React from "react";
import ProfileImage from "./ProfileImage";

export default class BubbleList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.imageURIs.map((imageURI, index) => <ProfileImage src={`url("${imageURI}")`} style={{
          height: "40px",
          width: "40px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "white",
          display: "inline-block",
          position: "absolute",
          left: `${index * 2}em`,
        }} />)}
      </div>
    )
  }
};