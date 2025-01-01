import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {sentenceCase} from './sentenceCase';

describe('sentenceCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, sentenceCase())).toBe(expected.sentenceCase);
  });
});
