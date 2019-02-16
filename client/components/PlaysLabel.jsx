import React from "react";
import IconLabel from "./IconLabel";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
library.add(faPlay);

export default class PlaysLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconLabel faIcon={"play"} text={this.props.plays} />
    )
  }
}
