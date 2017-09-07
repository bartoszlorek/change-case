import applyMethod from '../../src/scripts/apply-method';

describe('apply-method.js', () => {
    document.body.innerHTML = '<p id="element">text to change</p>';

    const element = document.getElementById('element');
    const node = {
        element: element.firstChild,
        text: element.textContent,
        offset: [2, 12]
    }

    it('should return false', () => {
        expect(applyMethod(10)).toBeFalsy();
        expect(applyMethod('upperCase', null))
            .toBeFalsy();
    })
    it('should change text', () => {
        applyMethod('upperCase', node);
        expect(node.element.nodeValue)
            .toEqual('teXT TO CHANge');
    })

})