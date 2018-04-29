import React from 'react'
import PropTypes from 'prop-types'

import Notification from './Notification'

class Notifications extends React.PureComponent {
    render() {
        let { items, state } = this.props

        if (!items.length) {
            return null
        }
        return (
            <div>
                {items
                    .filter(item => item.state === state)
                    .map((item, index) => (
                        <Notification
                            key={index}
                            value={item.value}
                        />
                    ))}
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
