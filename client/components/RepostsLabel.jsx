import React from "react";
import IconLabel from "./IconLabel";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
library.add(faRetweet);

export default class RepostLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconLabel faIcon={"retweet"} text={this.props.reposts} />
    )
  }
}
