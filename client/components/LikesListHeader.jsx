import React from "react";
import IconLabel from "./IconLabel";
import LikesLabel from "./LikesLabel";
import ListSeparator from './ListSeparator'

export default class LikesListHeader extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span style={{ align: "left" }}>
          <LikesLabel />
          <span>47K LIKES </span>
        </span>
        <span style={{ float: "right" }}>
          <text>View All</text>
        </span>
      </div>
    );
  }
}
