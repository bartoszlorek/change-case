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
        this.props.onData(e.target.value);
    }

    render() {
        let { data, value } = this.props;
        return (
            <input type='text'
                defaultValue={value || data}
                onChange={this.handleChange}
            />
        )
    }
}

export default Input;