import applyIgnore from '../src/apply-ignore.js';
import CASE_METHODS from '../src/cases.js';

const { upperCase } = CASE_METHODS;

const sentence = 'The quick brown fox jumps over the lazy dog, not the second brown fox at the end.';
const words = ['Brown Fox', 'lazy'];

describe('apply-ignore.js', () => {

    it('should apply case to whole string', () => {
        const sentenceUpperCase = upperCase(sentence);
        const result = applyIgnore(upperCase, sentence);
        expect(result).toEqual(sentenceUpperCase);
    })

    it('should ignore reserved words', () => {
        const result = applyIgnore(upperCase, sentence, words);
        expect(result).toEqual('THE QUICK Brown Fox JUMPS OVER THE lazy DOG, NOT THE SECOND Brown Fox AT THE END.');
    })

})