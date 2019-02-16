import React from "react";
import IconLabel from "./IconLabel";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faCommentAlt);

export default class CommentsLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconLabel faIcon={"comment-alt"} text={this.props.comments} />
    )
  }
}
