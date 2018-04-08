import React from 'react'
import PropTypes from 'prop-types'

import Notification from './Notification'

class Notifications extends React.PureComponent {
    render() {
        const { values, state } = this.props

        if (!values.length) {
            return null
        }
        return (
            <div>
                {values
                    .filter(a => a.state == state)
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
    values: PropTypes.array
}

Notifications.defaultProps = {
    values: []
}

export default Notifications
