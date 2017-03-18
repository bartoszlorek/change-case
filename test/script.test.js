import { testExport } from '../src/script.js';
const { nextNode, rangeTextNodes, parseNodes, changeCase } = testExport;

describe('script.js', () => {

    document.body.innerHTML =
        '<p id="first">the quick brown</p>' +
        '<p id="second">fox jumps over</p>' +
        '<p id="third">the lazy dog</p>';

    let fakeRange = {
        empty: () => {},
        start: document.getElementById('first').firstChild,
        end: document.getElementById('second').firstChild,
        offset: [2, 11]
    }

    it('fake range is working', () => {
        expect(
            fakeRange.start.nodeValue
        ).toEqual('the quick brown')
    })
    
    describe('nextNode', () => {
        let first = nextNode(fakeRange.start.parentElement),
            second = nextNode(first),
            third = nextNode(second);

        it('should return first text node', () => {
            expect(
                first.nodeValue
            ).toEqual('the quick brown')
        })
        it('should return second paragraph', () => {
            expect(
                second.id
            ).toEqual('second')
        })
        it('should return second text node', () => {
            expect(
                third.nodeValue
            ).toEqual('fox jumps over')
        })
    })

    describe('rangeTextNodes', () => {
        it('should return empty array', () => {
            expect(
                rangeTextNodes(null)
            ).toEqual([]);
        })
        it('should return array', () => {
            expect(
                rangeTextNodes(fakeRange)
            ).toBeInstanceOf(Array);
        })
        it('should return 2 text node', () => {
            expect(
                rangeTextNodes(fakeRange).length
            ).toEqual(2);
        })
        it('first item should be first paragraph text node', () => {
            expect(
                rangeTextNodes(fakeRange)[0].nodeValue
            ).toEqual('the quick brown');
        })
    })

    describe('parseNodes', () => {
        it('should return empty array', () => {
            expect(
                parseNodes(null)
            ).toEqual([]);
        })
        it('first item`s should be [2,15]', () => {
            expect(
                parseNodes(fakeRange)[0].range
            ).toEqual([2, 15]);
        })
    })
    
    describe('changeCase', () => {
        let fakeNode = {
            element: document.getElementById('third').firstChild,
            range: [2, 12],
            text: 'text to change',
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