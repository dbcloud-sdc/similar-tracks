import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class IconLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        &nbsp;
        <span>
          <FontAwesomeIcon icon={this.props.faIcon} size={"sm"} />
        </span>
        &nbsp;
        <span>
          {this.props.text}
        </span>
        &nbsp;
      </span>
    )
  }
}
