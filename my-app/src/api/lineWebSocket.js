import React from 'react'

import { GuideContext } from '../context';
import { formatUpdate } from '../utils/formaters/guide';

class LineWebSocket extends React.Component {
  static contextType = GuideContext;

  componentDidMount() {
    this.context.cableApp.cable.subscriptions.create({channel: "LineChannel"}, {
      received: (response) => {
        this.context.updateGuides(formatUpdate(response));
      }
    })
  }
  render() {
    return(
      <></>
    );
  }
}

export default LineWebSocket;
