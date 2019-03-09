import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { isPlainObject, isEqual } from 'lodash';

import { createMemo } from './.utils/react-utils';
import message from '../.utils/chrome/message';
import { getStateOnce } from '../.utils/chrome/extension-state';
import { deepFilter } from '../.utils/deep';

import { isTruthy } from './types';
import messages from './messages';

import confirm from './components/dialog/confirm';
import Section from './components/layout/Section';
import Sections from './components/layout/Sections';
import Controls from './components/layout/Controls';
import Ribbon from './components/Ribbon';
import Button, { PrimaryButton } from './components/forms/Button';
import Textarea from './components/forms/Textarea';
import Checkbox from './components/forms/Checkbox';
import Console, { createLogger } from './components/Console';
import Notifications from './components/notifications/Notifications';

const LOG_TIMEOUT = 3000;

const addValue = (data, value) => {
  if (isPlainObject(value)) {
    return Object.assign({}, data, value);
  }
  return value;
};

class Options extends React.Component {
  state = {
    extState: null,
    isUpdated: true,
    savedData: {},
    data: {},
    logger: null
  };

  constructor(props) {
    super(props);

    this.memo = createMemo();
    getStateOnce(extState => {
      this.setState({
        extState
      });
    });
  }

  componentDidMount() {
    chrome.storage.sync.get(null, data => {
      this.setState({
        isUpdated: true,
        savedData: data,
        data
      });
    });
  }

  handleLogs = (text, type) =>
    this.setState({
      logger: createLogger(text, type)
    });

  handleData = name =>
    this.memo(name, value => {
      this.setState(({ savedData, data }) => {
        let nextData = deepFilter(
          Object.assign({}, data, {
            [name]: addValue(data[name], value)
          }),
          isTruthy
        );
        return {
          isUpdated: isEqual(savedData, nextData),
          data: nextData
        };
      });
    });

  handelSave = () => {
    if (this.state.isUpdated) {
      return false;
    }
    let { sync } = chrome.storage;
    sync.clear();
    sync.set(this.state.data, () => {
      this.handleLogs('options saved');
      this.setState({
        isUpdated: true,
        savedData: this.state.data
      });
      message.toTab.all({
        type: 'BIND_SHORTCUTS'
      });
    });
  };

  handleReject = () => {
    confirm('Do you want to discard unsaved changes?').then(() => {
      this.setState(({ savedData }) => ({
        isUpdated: true,
        data: savedData
      }));
    });
  };

  handleShortcuts = () =>
    chrome.tabs.create({
      url: 'chrome://extensions/shortcuts'
    });

  render() {
    let { extState, isUpdated, data, logger } = this.state;

    return (
      <div className={this.props.className}>
        <Sections>
          <Notifications items={messages} state={extState} />
          <Section>
            <Checkbox
              value={data['updateNotification']}
              label="Show update notifications"
              onChange={this.handleData('updateNotification')}
            />
          </Section>
          <Section
            title="Keyboard Shortcuts"
            description="Since 2.3.0 version, this extension supports browser native keyboard shortcuts. Open them and scroll to Change Case card."
          >
            <PrimaryButton
              width="100%"
              value="Open Chrome Keyboard Shortcuts"
              onClick={this.handleShortcuts}
            />
          </Section>
          <Section
            title="Ignore List"
            description='comma-separated list of case-insensitive words to *ignore* during conversion, "e.g. Hello World, New York, John, ..."'
          >
            <Textarea
              value={data['ignoreList']}
              onChange={this.handleData('ignoreList')}
            />
          </Section>
          <Section
            title="Correct List"
            description='comma-separated list of case-insensitive words to *replace* during conversion, "e.g. 
                        Hi Mark!, VHS, ..."'
          >
            <Textarea
              value={data['correctList']}
              onChange={this.handleData('correctList')}
            />
          </Section>
        </Sections>
        <Controls>
          <Console
            logger={logger}
            timeout={LOG_TIMEOUT}
            handler={this.handleLogs}
          />
          <Button
            value="Reject"
            hidden={isUpdated}
            onClick={this.handleReject}
          />
          <PrimaryButton
            value="Save"
            disabled={isUpdated}
            onClick={this.handelSave}
          />
        </Controls>
        <Ribbon active={!isUpdated} />
      </div>
    );
  }
}

export default Options;

createGlobalStyle`
    body {
        margin: 0;
        background: #f6f7f9;
    }

    ::selection {
        background: #edd55e;
        color: #000;
    }
`;
