import React from 'react';
import { bind } from '../react-utils';

class Input extends React.Component {
    constructor(props) {
        super(props);
        bind(this, [
            'handleChange'
        ]);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <input
                {...this.props}
                type='text'
                onChange={this.handleChange}
            />
        )
    }
}

export default Input;