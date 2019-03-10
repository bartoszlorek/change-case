import React from 'react';
import styled from 'styled-components';

class Textarea extends React.PureComponent {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const {value, rows} = this.props;

    return (
      <textarea
        {...this.props}
        value={value || ''}
        rows={rows || '5'}
        onChange={this.handleChange}
      />
    );
  }
}

export default styled(Textarea)`
  width: 100%;
  resize: vertical;
  border: 1px solid #dddfe2;
  padding: 4px 6px;
  box-sizing: border-box;
  outline: 0;

  &:focus {
    border-color: #009ff1;
  }
`;
