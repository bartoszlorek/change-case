import applyBlacklist from '../../src/scripts/apply-blacklist'
import CASE_METHODS from '../../src/scripts/cases'

const { upperCase, pascalCase, sentenceCase } = CASE_METHODS

describe('apply-blacklist.js', () => {
    it('should apply case to whole string', () => {
        let result = applyBlacklist(upperCase, 'lazy brown fox')
        expect(result).toEqual('LAZY BROWN FOX')
    })

    it('should ignore given words by array', () => {
        let source = 'The lazy brown fox jumps over the lazy dog.',
            output = 'THE lazy brown fox JUMPS OVER THE lazy DOG.',
            result = applyBlacklist(upperCase, source, ['Brown Fox', 'LAZY'])
        expect(result).toEqual(output)
    })

    it('should handle change from long to short string', () => {
        let source = 'The lazy brown fox jumps over the lazy dog.',
            output = 'Thelazybrown foxJumpsOverThelazyDog',
            result = applyBlacklist(pascalCase, source, ['Brown Fox', 'LAZY'])
        expect(result).toEqual(output)
    })

    it('should handle change from short to long string', () => {
        let source = 'TheLazyBROWN FOXJumpsOverTheLazyDog.',
            output = 'The Lazy BROWN FOX jumps over the Lazy dog.',
            result = applyBlacklist(sentenceCase, source, ['Brown Fox', 'LAZY'])
        expect(result).toEqual(output)
    })
})
