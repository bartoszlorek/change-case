import {act} from 'react-dom/test-utils';

export const click = (component, target) => {
  act(() => {
    component.simulate('click', target ? {target} : {});
  });

  component.root().update();
};

export const change = (component, target) => {
  act(() => {
    component.simulate('change', {target});
  });

  component.root().update();
};
