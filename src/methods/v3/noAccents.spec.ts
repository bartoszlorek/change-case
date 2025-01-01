import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {noAccents} from './noAccents';

describe('noAccents()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, noAccents())).toBe(expected.noAccents);
  });
});
