import nodeValue from '../../src/scripts/utils/node-value';

describe('node-value.js', () => {

    document.body.innerHTML =
        '<input value="the quick" />' +
        '<textarea>brown fox</textarea>' +
        '<div>jumps over</div>' +
        '<p>the lazy</p>' +
        '<span>dog</span>';

    const input = document.querySelector('input');
    const textarea = document.querySelector('textarea');
    const div = document.querySelector('div');
    const paragraph = document.querySelector('p');
    const span = document.querySelector('span');

    it('should return empty string', () => {
        expect(nodeValue()).toBe('');
        expect(nodeValue(null)).toBe('');
        expect(nodeValue({})).toBe('');
        expect(nodeValue(div)).toBe('');
        expect(nodeValue(paragraph)).toBe('');
        expect(nodeValue(span)).toBe('');
    })

    it('should return value of node/text element', () => {
        expect(nodeValue(input)).toBe('the quick');
        expect(nodeValue(textarea)).toBe('brown fox');
        expect(nodeValue(div.firstChild)).toBe('jumps over');
        expect(nodeValue(paragraph.firstChild)).toBe('the lazy');
        expect(nodeValue(span.firstChild)).toBe('dog');
    })

    it('should change and return text of nodes', () => {
        let result = nodeValue(div.firstChild, 'jumped over');
        expect(div.firstChild.nodeValue).toBe('jumped over');
        expect(result).toBe('jumped over');
    })

    it('should change and return text of text elements', () => {
        let result = nodeValue(input, 'the fast');
        expect(input.value).toBe('the fast');
        expect(result).toBe('the fast');
    })

})