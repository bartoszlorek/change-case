import nextNode from '../../src/scripts/next-node';
import rangeNodes from '../../src/scripts/range-nodes';
import rangeText from '../../src/scripts/range-text';

describe('range', () => {

    document.body.innerHTML =
        '<p id="first">the quick brown</p>' +
        '<p id="second">fox jumps over</p>' +
        '<p id="third">the lazy dog</p>';

    const fakeRange = {
        empty: () => { },
        start: document.getElementById('first').firstChild,
        end: document.getElementById('second').firstChild,
        offset: [2, 11]
    }

    it('range is working', () => {
        expect(fakeRange.start.nodeValue).toEqual('the quick brown');
    })

    describe('nextNode', () => {
        let first = nextNode(fakeRange.start.parentElement),
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
        it('should return empty array', () => {
            expect(rangeNodes(null)).toEqual([]);
        })
        it('should return array', () => {
            expect(rangeNodes(fakeRange)).toBeInstanceOf(Array);
        })
        it('should return 2 text node', () => {
            expect(rangeNodes(fakeRange).length).toEqual(2);
        })
        it('first item should be first paragraph text node', () => {
            expect(rangeNodes(fakeRange)[0].nodeValue)
                .toEqual('the quick brown');
        })
    })

    describe('rangeText', () => {
        it('should return empty array', () => {
            expect(rangeText(null)).toEqual([]);
        })
        it('first item`s should be [2,15]', () => {
            expect(rangeText(fakeRange)[0].range).toEqual([2, 15]);
        })
    })

})