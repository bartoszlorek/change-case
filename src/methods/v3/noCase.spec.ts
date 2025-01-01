import {renderString} from '../../tokenizer';
import {noCase} from './noCase';

describe('noCase()', () => {
  it('is not implemented', () => {
    expect(renderString('hello world', noCase())).toBe('hello world');
  });
});
