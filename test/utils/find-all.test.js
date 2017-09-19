import findAll from '../../src/.utils/find-all';

const sentence = 'The lazy brown fox jumps over the Lazy dog.';
const search = ['Brown Fox', 'LAZY'];

describe('find-all.js', () => {

    it('should return empty array', () => {
        const withoutSearch = findAll(sentence);
        const wrongSearch = findAll(sentence, ['not', 'found']);
        expect(withoutSearch).toEqual([]);
        expect(wrongSearch).toEqual([]);
    })

    it('should match two by string', () => {
        const result = findAll(sentence, 'LAZY');
        expect(result.length).toBe(2);
    })

    it('should match three by array', () => {
        const result = findAll(sentence, search);
        expect(result.length).toBe(3);
    })

    it('should match `lazy` two times', () => {
        const result = findAll(sentence, search);
        expect(result[0].match).toBe('lazy');
        expect(result[2].match).toBe('Lazy');
    })

})