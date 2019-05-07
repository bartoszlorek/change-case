import * as React from 'react';
import {connectToState} from '@utils/chrome/extension-state';

class ExtensionController extends React.PureComponent {
  state = {
    extState: null
  };

  constructor(props) {
    super(props);

    connectToState(extState => {
      this.setState({
        extState
      });
    });
  }

  render() {
    return this.props.children({
      extState: this.state.extState
    });
  }
}

export default ExtensionController;
