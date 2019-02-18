import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faPlayCircle);

export default class PlayTracksIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <FontAwesomeIcon icon="play-circle" color="#f50" size="2x" style={{ display: this.props.display, margin: "auto", width: "30px", height: "30px", paddingLeft: "10px", paddingTop: "10px" }} />
      </div>
    )
  }
}
