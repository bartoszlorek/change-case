import * as React from 'react';

import Notification from './Notification';

const Notifications = ({values, state}) => (
  <React.Fragment>
    {values
      .filter(item => item.state === state)
      .map((item, index) => (
        <Notification key={index} value={item.value} />
      ))}
  </React.Fragment>
);

export default Notifications;
