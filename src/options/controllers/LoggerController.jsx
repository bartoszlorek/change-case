import * as React from 'react';

export const TYPE = {
  INFO: 'info',
  WARN: 'warn'
};

class LoggerController extends React.PureComponent {
  state = {
    text: null,
    type: TYPE.INFO
  };

  logText = (text, type) => {
    this.setState({
      text: text || null,
      type: type || TYPE.INFO
    });

    if (text !== null) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.logText(null);
      }, this.props.timeout);
    }
  };

  getLogger = () => {
    const {text, type} = this.state;
    return text === null ? null : {text, type};
  };

  render() {
    return this.props.children({
      logger: this.getLogger(),
      logInfo: text => this.logText(text, TYPE.INFO),
      logWarn: text => this.logText(text, TYPE.WARN)
    });
  }
}

export default LoggerController;
