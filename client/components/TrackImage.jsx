import React from 'react';
import style, { css } from 'styled-components';
import PlayTracksIcon from './PlayTracksIcon';

// const { styled } = window;

const TrackImage = style.div`
  ${props => props.src && css`
  background-image: ${props.src}`};
  height: 50px;
  width: 50px;
  background-size: 50px 50px;
`;


export default class PlayTrackImage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TrackImage src={this.props.src} style={{ float: "left", marginRight: ".5em", }}>
        <PlayTracksIcon display={this.props.isSelected ? "inline-block" : "none"} style={{ margin: "auto", width: "50px", height: "50px" }} />
      </TrackImage>
    )
  }
}

