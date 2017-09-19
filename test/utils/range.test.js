import isTextNode from '../../src/.utils/is-text-node';
import rangeNodes from '../../src/.utils/range-nodes';
import rangeContent from '../../src/.utils/range-content';

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

    describe('rangeNodes', () => {
        it('should return an empty array', () => {
            expect(rangeNodes(null)).toEqual([]);
        })
        it('should return 2 text node', () => {
            let nodes = rangeNodes(range).filter(isTextNode);
            expect(nodes.length).toEqual(2);
        })
        it('first item should be first paragraph text node', () => {
            expect(rangeNodes(range)[0].nodeValue)
                .toEqual('the quick brown');
        })
    })

    describe('rangeContent', () => {
        it('should return empty array', () => {
            expect(rangeContent(null)).toEqual([]);
        })
        it('first item offset should be [2,15]', () => {
            let first = rangeContent(range)[0];
            expect(first.startOffset).toBe(2);
            expect(first.endOffset).toBe(15);
        })
    })

})