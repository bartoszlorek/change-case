import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {pascalCase} from './pascalCase';

describe('pascalCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, pascalCase())).toBe(expected.pascalCase);
  });
});
