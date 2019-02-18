import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
library.add(faEllipsisH);
import BoxButton from './BoxButton'

export default class Dots extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span style={{ display: this.props.isSelected ? "inline-block" : "none" }}>
        <BoxButton>
          <FontAwesomeIcon icon="ellipsis-h" color="#333" size="2x" />
        </BoxButton>
      </span>
    )
  }
}
