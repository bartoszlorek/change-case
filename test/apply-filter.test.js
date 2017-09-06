import applyFilter from '../src/scripts/apply-filter';
import CASE_METHODS from '../src/scripts/cases';

const { upperCase, pascalCase, sentenceCase } = CASE_METHODS;

describe('apply-filter.js', () => {

    it('should apply case to whole string', () => {
        let result = applyFilter(upperCase, 'lazy brown fox');
        expect(result).toEqual('LAZY BROWN FOX');
    })

    it('should ignore given words', () => {
        let source = 'The lazy brown fox jumps over the lazy dog.',
            output = 'THE lazy brown fox JUMPS OVER THE lazy DOG.',
            result = applyFilter(upperCase, source, ['Brown Fox', 'LAZY']);
        expect(result).toEqual(output);
    })

    it('should handle change from long to short string', () => {
        let source = 'The lazy brown fox jumps over the lazy dog.',
            output = 'Thelazybrown foxJumpsOverThelazyDog.',
            result = applyFilter(pascalCase, source, ['Brown Fox', 'LAZY']);
        expect(result).toEqual(output);
    })

    it('should handle change from short to long string', () => {
        let source = 'TheLazyBROWN FOXJumpsOverTheLazyDog.',
            output = 'The Lazy BROWN FOX jumps over the Lazy dog.',
            result = applyFilter(sentenceCase, source, ['Brown Fox', 'LAZY']);
        expect(result).toEqual(output);
    })

})