import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class IconLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span>
        <span>
          <FontAwesomeIcon icon={this.props.faIcon} />
        </span>
        <span>
          {this.props.text}
        </span>
      </span>
    )
  }
}
export default IconLabel;