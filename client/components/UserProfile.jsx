import React from 'react'
import ProfileImage from './ProfileImage';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div style={{ height: "150px", width: "75px" }}>
      <div ><ProfileImage src={`url("${this.props.user.pic}")`}></ProfileImage></div>
      <div>{this.props.user.username}</div>
      <button>Follow</button>
    </div>);
  }
}