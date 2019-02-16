import React from "react";
import IconLabel from "./IconLabel";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faSquare);

export default class InPlaylistsLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconLabel faIcon={"square"} text={"In Playlists"} />
    )
  }
}
