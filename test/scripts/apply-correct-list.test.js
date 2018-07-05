import applyCorrectList from '../../src/scripts/operators/apply-correct-list'
import createState from '../../src/scripts/operators/.internal/create-state'

describe('apply-correct-list.js', () => {
    it('should return unchanged string (no additional data)', () => {
        const state = createState()('lazy brown fox')
        const data = null

        applyCorrectList(data)(state)
        expect(state).toEqual({
            method: null,
            result: 'lazy brown fox',
            source: 'lazy brown fox'
        })
    })

    it('should replace words from array', () => {
        const source = 'The lazy brown fox jumps over the lazy dog.'
        const result = 'The LAZY Brown Fox jumps over the LAZY dog.'
        const state = createState()(source)
        const data = ['Brown Fox', 'LAZY']

        applyCorrectList(data)(state)
        expect(state).toEqual({
            method: null,
            source,
            result
        })
    })
})
