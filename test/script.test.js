import { testExport } from '../src/script.js';
const { nextNode, getRangeTextNodes, parseRange, changeCase } = testExport;

describe('script.js', () => {

    document.body.innerHTML =
        '<p id="first">the quick brown</p>' +
        '<p id="second">fox jumps over</p>' +
        '<p id="third">the lazy dog</p>';

    let fakeRange = {
        startContainer: document.getElementById('first').firstChild,
        endContainer: document.getElementById('second').firstChild,
        startOffset: 2,
        endOffset: 11
    }

    it('fake range is working', () => {
        expect(
            fakeRange.startContainer.nodeValue
        ).toEqual('the quick brown')
    })
    
    describe('nextNode', () => {
        let start = fakeRange.startContainer.parentElement,
            firstIteration = nextNode(start),
            secondIteration = nextNode(firstIteration),
            thirdIteration = nextNode(secondIteration);

        it('should return first text node', () => {
            expect(
                firstIteration.nodeValue
            ).toEqual('the quick brown')
        })
        it('should return second paragraph', () => {
            expect(
                secondIteration.id
            ).toEqual('second')
        })
        it('should return second text node', () => {
            expect(
                thirdIteration.nodeValue
            ).toEqual('fox jumps over')
        })
    })

    describe('getRangeTextNodes', () => {
        it('should return empty array', () => {
            expect(
                getRangeTextNodes(null)
            ).toEqual([]);
        })
        it('should return array', () => {
            expect(
                getRangeTextNodes(fakeRange)
            ).toBeInstanceOf(Array);
        })
        it('should return 2 text node', () => {
            expect(
                getRangeTextNodes(fakeRange).length
            ).toEqual(2);
        })
        it('first item should be first paragraph text node', () => {
            expect(
                getRangeTextNodes(fakeRange)[0].nodeValue
            ).toEqual('the quick brown');
        })
    })

    describe('parseRange', () => {
        it('should return empty array', () => {
            expect(
                parseRange(null)
            ).toEqual([]);
        })
        it('first item`s should be [2,15]', () => {
            expect(
                parseRange(fakeRange)[0].range
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