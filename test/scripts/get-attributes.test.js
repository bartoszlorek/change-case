import getAttributes from '../../src/scripts/utils/get-attributes';

describe('get-attributes.js', () => {

    document.body.innerHTML =
        '<input id="input" type="text" value="the quick brown fox" />';

    const input = document.getElementById('input');

    it('should return empty array', () => {
        expect(getAttributes()).toEqual([]);
        expect(getAttributes(null)).toEqual([]);
    })

    it('should return all attributes', () => {
        let result = getAttributes(input);
        expect(result.length).toBe(3);
        expect(result[0].name).toBe('id');
        expect(result[1].name).toBe('type');
        expect(result[2].name).toBe('value');
    })

    it('should return only included attributes', () => {
        let result = getAttributes(input, ['type']);
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('type');
    })

})