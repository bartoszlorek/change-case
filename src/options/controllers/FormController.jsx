import * as React from 'react';
import {isPlainObject, isEqual} from 'lodash';
import {deepFilter} from '@utils/deep';
import {isTruthy} from '../types';

import confirm from '../components/dialog/confirm';

const addValue = (data, value) => {
  if (isPlainObject(value)) {
    return {...data, ...value};
  }
  return value;
};

class FormController extends React.Component {
  state = {
    isUpdated: true,
    savedData: {},
    data: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    chrome.storage.sync.get(null, data => {
      this.setState({
        isUpdated: true,
        savedData: data,
        data
      });
    });
  };

  saveData = () => {
    const {isUpdated, data} = this.state;

    if (isUpdated) {
      return;
    }
    const {sync} = chrome.storage;
    const {onSave} = this.props;

    sync.clear();
    sync.set(data, () => {
      this.setState({
        isUpdated: true,
        savedData: data
      });
      onSave && onSave();
    });
  };

  rejectData = () => {
    confirm('Do you want to discard unsaved changes?').then(() => {
      this.setState(({savedData}) => ({
        isUpdated: true,
        data: savedData
      }));
    });
  };

  getFieldProps = name => ({
    value: this.state.data[name],
    onChange: value => {
      this.setState(({savedData, data}) => {
        const nextData = deepFilter(
          {...data, [name]: addValue(data[name], value)},
          isTruthy
        );

        return {
          isUpdated: isEqual(savedData, nextData),
          data: nextData
        };
      });
    }
  });

  render() {
    return this.props.children({
      isUpdated: this.state.isUpdated,
      getFieldProps: this.getFieldProps,
      saveFormData: this.saveData,
      rejectFormData: this.rejectData
    });
  }
}

export default FormController;
