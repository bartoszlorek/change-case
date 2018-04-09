import React from 'react'
import PropTypes from 'prop-types'

import Notification from './Notification'

class Notifications extends React.PureComponent {
    render() {
        if (!this.props.values.length) {
            return null
        }
        return (
            <div>
                {this.props.values
                    .filter(a => a.state == this.props.state)
                    .map((a, i) => (
                        <Notification
                            key={i}
                            value={a.value}
                        />
                    ))
                }
            </div>
        )
    }
}

Notifications.propTypes = {
    values: PropTypes.array,
    state: PropTypes.string
}

Notifications.defaultProps = {
    values: [],
    state: null
}

export default Notifications
