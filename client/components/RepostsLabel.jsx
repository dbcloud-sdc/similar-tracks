import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart, faPlay, faRetweet, faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';
import IconLabel from './IconLabel';


library.add(faHeart);
library.add(faPlay);
library.add(faRetweet);
library.add(faCommentAlt);

class RepostsLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <IconLabel faIcon={"retweet"} text={this.props.reposts} />
    )
  }
}

export default RepostsLabel;