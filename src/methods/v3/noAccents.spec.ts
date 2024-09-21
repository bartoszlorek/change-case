import scenarios from '../../scenarios';
import {noAccents} from './noAccents';

describe('noAccents()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(noAccents(source)).toBe(expected.noAccents);
  });
});
