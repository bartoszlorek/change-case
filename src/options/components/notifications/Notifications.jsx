import * as React from 'react';
import PropTypes from 'prop-types';

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

Notifications.propTypes = {
  values: PropTypes.array,
  state: PropTypes.string
};

Notifications.defaultProps = {
  values: [],
  state: null
};

export default Notifications;
