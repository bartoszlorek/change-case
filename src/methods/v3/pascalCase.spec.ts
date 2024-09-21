import scenarios from '../../scenarios';
import {pascalCase} from './pascalCase';

describe('pascalCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(pascalCase(source)).toBe(expected.pascalCase);
  });
});
