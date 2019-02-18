import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import BoxButton from './BoxButton';
library.add(faHeart);


export default class HeartBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span style={{ display: this.props.isSelected ? "inline-block" : "none" }}>
        <BoxButton >
          <FontAwesomeIcon icon="heart" color="#333" size="2x" />
        </BoxButton>
      </span>
    )
  }
}
