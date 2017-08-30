import applyFilter from '../src/utils/apply-filter';
import CASE_METHODS from '../src/cases';

const { upperCase } = CASE_METHODS;

const sentence = 'The lazy Brown Fox jumps over the Lazy dog.';
const search = ['brown fox', 'LAZY'];

describe('apply-filter.js', () => {

    it('should apply case to whole string', () => {
        const sentenceUpperCase = upperCase(sentence);
        const result = applyFilter(upperCase, sentence);
        expect(result).toEqual(sentenceUpperCase);
    })
    it('should ignore reserved words', () => {
        const result = applyFilter(upperCase, sentence, search);
        expect(result).toEqual('THE lazy Brown Fox JUMPS OVER THE Lazy DOG.');
    })

})