import React from 'react';
import { bind } from '../utils/react-utils';

class Textarea extends React.Component {
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
            <textarea
                {...this.props}
                rows={this.props.rows || '5'}
                onChange={this.handleChange}>
            </textarea>
        )
    }
}

export default Textarea;