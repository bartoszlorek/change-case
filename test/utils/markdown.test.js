import markdown from '../../src/.utils/react/markdown';

const sentence = 'press "Delete" to remove assignment. Important! You *MUST* reload existing tabs after saving changes. Tip: do not use codes colliding with browser or language combinations.'

describe('markdown.js', () => {

    it('should return object with whole string', () => {
        expect(markdown(sentence)[0].text).toBe(sentence);
        expect(markdown(sentence, null)[0].text).toBe(sentence);
        expect(markdown(sentence, [])[0].mark).toBe(null);
    })

    it('should return object split into parts', () => {
        let result = markdown(sentence, ['"', '*']);
        expect(result.length).toBe(5);
        expect(result[0].text).toBe('press ');
        expect(result[1].mark).toBe('"');
        expect(result[2].mark).toBe(null);
        expect(result[3].text).toBe('MUST');
    })

})