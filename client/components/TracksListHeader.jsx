import React from "react";
import IconLabel from "./IconLabel";
import RelatedTracksLabel from "./RelatedTracksLabel";

export default class TracksListHeader extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span style={{ align: "left" }}>
          <RelatedTracksLabel />
        </span>
        <span style={{ float: "right" }}>
          View All
        </span>
      </div>
    );
  }
}
