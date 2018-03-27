import indicesOf from '../../src/.utils/indices-of'

describe('indices-of.js', () => {
    it('should return empty array', () => {
        expect(indicesOf()).toEqual([])
        expect(indicesOf('')).toEqual([])
    })

    it('should find one occurrence', () => {
        let string = 'the quick brown fox'
        expect(indicesOf(string, 'the')).toEqual([0])
    })

    it('should find two occurrences', () => {
        let string = 'the quick brown fox jumps over the lazy dog'
        expect(indicesOf(string, 'the')).toEqual([0, 31])
    })
})
