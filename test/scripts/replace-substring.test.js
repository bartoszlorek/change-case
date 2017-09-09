import replaceSubstring from '../../src/scripts/utils/replace-substring';

describe('replace-substring.js', () => {

    const sentence = 'The quick brown fox jumps over the lazy dog.';

    it('should return unchanged sentence', () => {
        expect(replaceSubstring(sentence)).toBe(sentence);
    })
    it('should cut sentence after n char', () => {
        expect(replaceSubstring(sentence, 19))
            .toBe('The quick brown fox');
    })
    it('should cut sentence between chars', () => {
        expect(replaceSubstring(sentence, 16, 40))
            .toBe('The quick brown dog.');
    })
    it('should cut sentence between chars with replacement', () => {
        expect(replaceSubstring(sentence, 16, 39, 'naughty'))
            .toBe('The quick brown naughty dog.');
    })
    it('should cut sentence between chars with callback', () => {
        let result = replaceSubstring(sentence, 16, 40,
            match => match.toUpperCase());
        expect(result).toBe('The quick brown FOX JUMPS OVER THE LAZY dog.');
    })

})