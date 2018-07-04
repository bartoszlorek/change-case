import applyCorrectList from '../../src/scripts/operators/apply-correct-list'

describe('apply-correct-list.js', () => {
    it('should return whole string (no additional data)', () => {
        let correctList = applyCorrectList(null)
        expect(correctList('lazy brown fox')).toEqual('lazy brown fox')
    })

    it('should replace words from array', () => {
        let source = 'The lazy brown fox jumps over the lazy dog.',
            output = 'The LAZY Brown Fox jumps over the LAZY dog.',
            correctList = applyCorrectList(null, ['Brown Fox', 'LAZY'])
        expect(correctList(source)).toEqual(output)
    })
})
