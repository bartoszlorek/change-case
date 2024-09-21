import scenarios from '../../scenarios';
import {paramCase} from './paramCase';

describe('paramCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(paramCase(source)).toBe(expected.paramCase);
  });
});
