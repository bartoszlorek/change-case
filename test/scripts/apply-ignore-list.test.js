import applyIgnoreList from '../../src/scripts/operators/apply-ignore-list'
import CASE_METHODS from '../../src/scripts/cases'

const { upperCase, pascalCase, sentenceCase } = CASE_METHODS

describe('apply-ignore-list.js', () => {
    it('should apply case to whole string (no additional data)', () => {
        let ignoreList = applyIgnoreList(upperCase)
        expect(ignoreList('lazy brown fox')).toEqual('LAZY BROWN FOX')
    })

    it('should ignore words from array', () => {
        let source = 'The lazy brown fox jumps over the lazy dog.',
            output = 'THE lazy brown fox JUMPS OVER THE lazy DOG.',
            ignoreList = applyIgnoreList(upperCase, ['Brown Fox', 'LAZY'])
        expect(ignoreList(source)).toEqual(output)
    })

    it('should handle change from long to short string', () => {
        let source = 'The lazy brown fox jumps over the lazy dog.',
            output = 'Thelazybrown foxJumpsOverThelazyDog',
            ignoreList = applyIgnoreList(pascalCase, ['Brown Fox', 'LAZY'])
        expect(ignoreList(source)).toEqual(output)
    })

    it('should handle change from short to long string', () => {
        let source = 'TheLazyBROWN FOXJumpsOverTheLazyDog.',
            output = 'The Lazy BROWN FOX jumps over the Lazy dog.',
            ignoreList = applyIgnoreList(sentenceCase, ['Brown Fox', 'LAZY'])
        expect(ignoreList(source)).toEqual(output)
    })
})
