import React from 'react';
import { pick } from 'lodash';
import { bind } from '../react-utils';

class Textarea extends React.Component {
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
        let { data, children } = this.props,
            props = pick(this.props, ['rows']);
        return (
            <textarea
                {...props}
                defaultValue={children || data}
                onChange={this.handleChange}>
            </textarea>
        )
    }
}

export default Textarea;