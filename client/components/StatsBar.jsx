import React from "react";

import LikesLabel from './LikesLabel';
import PlaysLabel from './PlaysLabel';
import CommentsLabel from './CommentsLabel';
import RepostsLabel from './RepostsLabel';

export default class StatsBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stats">
        {this.props.plays && <PlaysLabel plays={this.props.plays} /*onClick={this.props.playsClick}*/ />}
        {this.props.likes && <LikesLabel likes={this.props.likes} /*onClick={this.props.likesClick}*/ />}
        {this.props.reposts && <RepostsLabel reposts={this.props.reposts} />}
        {this.props.comments && <CommentsLabel comments={this.props.comments} />}
      </div>
    );
  }
}
