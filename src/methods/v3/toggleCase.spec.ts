import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {toggleCase} from './toggleCase';

describe('toggleCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, toggleCase())).toBe(expected.toggleCase);
  });
});
