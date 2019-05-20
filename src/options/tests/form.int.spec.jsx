import '__mocks__/chrome-environment';
import React from 'react';
import {mount} from 'enzyme';
import {click, change} from './test-utils';
import {step} from './test-steps';

import App from '../App';

describe('<App/>', () => {
  describe('options form', () => {
    chrome.storage.sync.get.mockImplementation((opt, fn) =>
      fn({
        updateNotification: false,
        ignoreList: 'Hello World, John',
        correctList: 'iOS, VHS'
      })
    );

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('shows saved fields and can update them', () => {
      const wrapper = mount(<App />);

      step('fills update notification field', () => {
        let updateNotification = wrapper
          .find('[name="update-notification"]')
          .hostNodes();

        expect(updateNotification.prop('checked')).toBe(false);
        change(updateNotification, {checked: true});

        updateNotification = wrapper
          .find('[name="update-notification"]')
          .hostNodes();

        expect(updateNotification.prop('checked')).toBe(true);
      });

      step('fills ignore list field', () => {
        let ignoreList = wrapper.find('[name="ignore-list"]').hostNodes();

        expect(ignoreList.prop('value')).toBe('Hello World, John');
        change(ignoreList, {value: 'Hi Mark!'});

        ignoreList = wrapper.find('[name="ignore-list"]').hostNodes();

        expect(ignoreList.prop('value')).toBe('Hi Mark!');
      });

      step('fills correct list field', () => {
        let correctList = wrapper.find('[name="correct-list"]').hostNodes();

        expect(correctList.prop('value')).toBe('iOS, VHS');
        change(correctList, {value: 'Android'});

        correctList = wrapper.find('[name="correct-list"]').hostNodes();

        expect(correctList.prop('value')).toBe('Android');
      });

      step('saves form by clicking on submit', () => {
        const submitButton = wrapper.find({value: 'Save'}).hostNodes();

        click(submitButton);
        expect(chrome.storage.sync.set).toHaveBeenLastCalledWith(
          {
            updateNotification: true,
            ignoreList: 'Hi Mark!',
            correctList: 'Android'
          },
          expect.any(Function)
        );
      });
    });
  });
});
