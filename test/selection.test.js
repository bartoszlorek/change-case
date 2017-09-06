import {
    _private,
    interpolateRange,
    selectionRange
} from '../src/scripts/selection';

const { nextNode, rangeTextNodes } = _private;

describe('selection.js', () => {

    document.body.innerHTML =
        '<p id="first">the quick brown</p>' +
        '<p id="second">fox jumps over</p>' +
        '<p id="third">the lazy dog</p>';

    let fakeRange = {
        empty: () => { },
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

    describe('interpolateRange', () => {
        it('should return empty array', () => {
            expect(
                interpolateRange(null)
            ).toEqual([]);
        })
        it('first item`s should be [2,15]', () => {
            expect(
                interpolateRange(fakeRange)[0].range
            ).toEqual([2, 15]);
        })
    })

})