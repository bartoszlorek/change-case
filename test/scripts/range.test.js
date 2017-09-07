import nextNode from '../../src/scripts/next-node';
import rangeNodes from '../../src/scripts/range-nodes';
import rangeText from '../../src/scripts/range-text';

describe('range', () => {

    document.body.innerHTML =
        '<p id="first">the quick brown</p>' +
        '<p id="second">fox jumps over</p>' +
        '<p id="third">the lazy dog</p>';

    const range = {
        startContainer: document.getElementById('first').firstChild,
        endContainer: document.getElementById('second').firstChild,
        startOffset: 2,
        endOffset: 11
    }

    it('range is working', () => {
        expect(range.startContainer.nodeValue).toEqual('the quick brown');
    })

    describe('nextNode', () => {
        let first = nextNode(range.startContainer.parentElement),
            second = nextNode(first),
            third = nextNode(second);

        it('should return first text node', () => {
            expect(first.nodeValue).toEqual('the quick brown');
        })
        it('should return second paragraph', () => {
            expect(second.id).toEqual('second');
        })
        it('should return second text node', () => {
            expect(third.nodeValue).toEqual('fox jumps over');
        })
    })

    describe('rangeNodes', () => {
        it('should return an empty array', () => {
            expect(rangeNodes(null)).toEqual([]);
        })
        it('should return an array', () => {
            expect(rangeNodes(range)).toBeInstanceOf(Array);
        })
        it('should return 2 text node', () => {
            expect(rangeNodes(range).length).toEqual(2);
        })
        it('first item should be first paragraph text node', () => {
            expect(rangeNodes(range)[0].nodeValue)
                .toEqual('the quick brown');
        })
    })

    describe('rangeText', () => {
        it('should return empty array', () => {
            expect(rangeText(null)).toEqual([]);
        })
        it('first item offset should be [2,15]', () => {
            let first = rangeText(range)[0];
            expect(first.startOffset).toBe(2);
            expect(first.endOffset).toBe(15);
        })
    })

})