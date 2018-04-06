import explode from '../../src/.utils/explode'

const string = 'The lazy brown fox jumps over the Lazy dog.'

describe('explode.js', () => {
    it('should return an empty array', () => {
        expect(explode()).toEqual([])
        expect(explode(null)).toEqual([])
    })

    it('should return an array with whole string', () => {
        expect(explode('dog')).toEqual(['dog'])
        expect(explode('')).toEqual([''])
    })

    it('should return an array with whole string', () => {
        let result = explode('lazy brown fox jumps', [4, 5, 11, 14])
        expect(result).toEqual(['lazy', ' ', 'brown ', 'fox', ' jumps'])
    })
})
