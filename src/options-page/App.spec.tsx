import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {App} from './App';

describe('<App/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fills ignore list field', () => {
    render(<App />);

    const textarea = screen.getByRole('textbox', {name: 'Ignore List'});

    fireEvent.change(textarea, {target: {value: 'foo, bar'}});

    expect(textarea).toHaveValue('foo, bar');
  });

  it('fills correct list field', () => {
    render(<App />);

    const textarea = screen.getByRole('textbox', {name: 'Correct List'});

    fireEvent.change(textarea, {target: {value: 'foo, bar'}});

    expect(textarea).toHaveValue('foo, bar');
  });

  it('saves form by clicking on submit', () => {
    render(<App />);

    const ignoreTextarea = screen.getByRole('textbox', {name: 'Ignore List'});
    const correctTextarea = screen.getByRole('textbox', {name: 'Correct List'});

    fireEvent.change(ignoreTextarea, {target: {value: 'foo'}});
    fireEvent.change(correctTextarea, {target: {value: 'bar'}});
    fireEvent.click(screen.getByRole('button', {name: 'Save'}));

    expect(chrome.storage.sync.set).toHaveBeenCalledWith(
      {
        ignoreList: 'foo',
        correctList: 'bar',
      },
      expect.any(Function)
    );
  });
});
