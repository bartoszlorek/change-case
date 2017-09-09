import applyMethod from '../../src/scripts/apply-method';

describe('apply-method.js', () => {
    document.body.innerHTML = '<p id="element">text to change</p>';

    const element = document.getElementById('element');
    const selected = {
        node: element.firstChild,
        text: element.textContent,
        startOffset: 2,
        endOffset: 12
    }

    it('should return rejected promise', () => {
        expect(applyMethod(10)).rejects.toBeFalsy();
        expect(applyMethod('upperCase', null)).rejects.toBeFalsy();
    })
    it('should change text and return it', () => {
        applyMethod('upperCase', selected).then(value => {
            expect(selected.node.nodeValue).toBe('teXT TO CHANge');
            expect(value).toBe('teXT TO CHANge');
        });
    })

})