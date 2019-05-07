let listeners = [];

export {STATE} from '.utils/chrome/extension-state';
export const connectToState = jest.fn(fn => listeners.push(fn));

// test helpers
export const mockedState = {
  dispatch: state => listeners.forEach(fn => fn(state)),
  clear: () => (listeners = [])
};
