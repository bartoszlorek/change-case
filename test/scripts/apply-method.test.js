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

    it('should return false', () => {
        expect(applyMethod(10)).toBeFalsy();
        expect(applyMethod('upperCase', null))
            .toBeFalsy();
    })
    it('should change text', () => {
        applyMethod('upperCase', selected);
        expect(selected.node.nodeValue)
            .toEqual('teXT TO CHANge');
    })

})