import explode from '../../src/.utils/explode'

const string = 'The lazy brown fox jumps over the Lazy dog.'

describe('falsy values', () => {
    it('should return an empty array', () => {
        expect(explode()).toEqual([])
        expect(explode(null)).toEqual([])
    })

    it('should return an array with whole string', () => {
        expect(explode('dog')).toEqual(['dog'])
        expect(explode('')).toEqual([''])
    })
})

describe('returns an array with parts of string', () => {
    it('simple scenario', () => {
        let result = explode('lazy brown fox jumps', [4, 5, 11, 14])
        expect(result).toEqual(['lazy', ' ', 'brown ', 'fox', ' jumps'])
    })

    it('starts with zero', () => {
        let result = explode('lazy brown fox jumps', [0, 5, 10])
        expect(result).toEqual(['lazy ', 'brown', ' fox jumps'])
    })

    it('last index is greater than length', () => {
        let result = explode('lazy brown fox jumps', [4, 5, 30])
        expect(result).toEqual(['lazy', ' ', 'brown fox jumps', ''])
    })
})
