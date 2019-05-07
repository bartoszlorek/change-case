import '__mocks__/chromeEnvironment';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {mount} from 'enzyme';

import App from '../App';
import Notification from '../components/notifications/Notification';
import {mockedState, STATE} from '@utils/chrome/extension-state';

describe('<App/>', () => {
  describe('notifications', () => {
    it('should not display notification after install', () => {
      const wrapper = mount(<App />);
      expect(wrapper.find(Notification)).toHaveLength(0);

      act(() => {
        mockedState.dispatch(STATE.INSTALL);
      });

      expect(wrapper.find(Notification)).toHaveLength(0);
    });

    it('should display notification after update', () => {
      const wrapper = mount(<App />);
      expect(wrapper.find(Notification)).toHaveLength(0);

      act(() => {
        mockedState.dispatch(STATE.UPDATE);
      });

      wrapper.update();
      expect(wrapper.find(Notification)).toHaveLength(1);
    });
  });
});
