import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {constantCase} from './constantCase';

describe('constantCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, constantCase())).toBe(expected.constantCase);
  });
});
