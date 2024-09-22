import scenarios from '../../scenarios';
import {sentenceCase} from './sentenceCase';

describe('sentenceCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(sentenceCase(source)).toBe(expected.sentenceCase);
  });
});
