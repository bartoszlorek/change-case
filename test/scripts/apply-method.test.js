import applyMethod from '../../src/scripts/apply-method';

describe('apply-method.js', () => {
    document.body.innerHTML = '<p id="element">text to change</p>';

    let element = document.getElementById('element'),
        fakeNode = {
            element: element.firstChild,
            text: element.textContent,
            range: [2, 12],
            type: 'text'
        }

    it('should return false', () => {
        expect(applyMethod(10)).toBeFalsy();
    })
    it('should return false', () => {
        expect(applyMethod('upperCase', { range: [] }))
            .toBeFalsy();
    })
    it('should change text', () => {
        applyMethod('upperCase', fakeNode);
        expect(fakeNode.element.nodeValue)
            .toEqual('teXT TO CHANge');
    })

})