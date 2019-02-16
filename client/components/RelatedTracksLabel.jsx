import React from "react";
import IconLabel from "./IconLabel";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignal } from '@fortawesome/free-solid-svg-icons'
library.add(faSignal);

export default class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconLabel faIcon={"signal"} text={"Related Tracks"} />
    )
  }
}
