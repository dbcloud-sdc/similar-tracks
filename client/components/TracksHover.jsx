import React from 'react';
import Dots from './Dots';
import HeartBox from './HeartBox';
import PlayTracksIcon from './PlayTracksIcon';

export default class TracksHover extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span>
        <span style={{ align: "left", display: "inline-block", verticalAlign: "middle" }}><PlayTracksIcon /></span>
        <span style={{ align: "right", display: "inline-block", verticalAlign: "middle" }}><HeartBox /></span>
        <span style={{ align: "right", display: "inline-block", verticalAlign: "middle" }}><Dots /></span>
      </span>
    )
  }
}

