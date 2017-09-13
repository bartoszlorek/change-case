import spliceString from '../../src/scripts/utils/splice-string';

describe('splice-substring.js', () => {

    const sentence = 'quick brown fox';

    it('should return empty string', () => {
        expect(spliceString()).toBe('');
        expect(spliceString(null)).toBe('');
        expect(spliceString(sentence)).toBe('');
    })
    it('should return unchanged sentence', () => {
        expect(spliceString(sentence, 15)).toBe(sentence);
        expect(spliceString(sentence, 5, 5)).toBe(sentence);
        expect(spliceString(sentence, 16, 20)).toBe(sentence);
    })
    it('should replace omitted END with string\'s length', () => {
        expect(spliceString(sentence, 5)).toBe('quick');
    })
    it('should swap START and END', () => {
        expect(spliceString(sentence, 11, 5)).toBe('quick fox');
        expect(spliceString(sentence, -5, -10)).toBe('quickn fox');
    })
    it('should take START from the end of string', () => {
        expect(spliceString(sentence, -4)).toBe('quick brown');
    })
    it('should take END from the end of string', () => {
        expect(spliceString(sentence, 5, -4)).toBe('quick fox');
    })
    it('should splice sentence with string replacement', () => {
        expect(spliceString(sentence, 6, 11, 'naughty'))
            .toBe('quick naughty fox');
    })
    it('should splice sentence with function replacement', () => {
        let result = spliceString(sentence, 6, 11,
            match => match.toUpperCase());
        expect(result).toBe('quick BROWN fox');
    })
    it('should handle replacement in place of END', () => {
        let result = spliceString(sentence, 6,
            match => match.toUpperCase());
        expect(result).toBe('quick BROWN FOX');
    })

})