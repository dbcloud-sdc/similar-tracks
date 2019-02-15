import React from 'react';
import ProfileImage from './ProfileImage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ProfileImage src={'url("http://placekitten.com/50/50")'} />
      </div>
    )
  }
}

export default App;