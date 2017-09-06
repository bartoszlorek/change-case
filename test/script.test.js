import { _private } from '../src/content-script';
const { changeCase } = _private;

describe('content-script.js', () => {
    document.body.innerHTML = '<p id="element">text to change</p>';

    describe('changeCase', () => {
        let element = document.getElementById('element'),
            fakeNode = {
                element: element.firstChild,
                text: element.textContent,
                range: [2, 12],
                type: 'text'
            }
        
        it('should return false', () => {
            expect(
                changeCase(10)
            ).toBeFalsy();
        })
        it('should return false', () => {
            expect(
                changeCase('upperCase', { range:[] })
            ).toBeFalsy();
        })
        it('should change text', () => {
            changeCase('upperCase', fakeNode);
            expect(
                fakeNode.element.nodeValue
            ).toEqual('teXT TO CHANge');
        })
    })
    
})