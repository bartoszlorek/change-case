import { nextNode, prevNode } from '../../src/.utils/node-sibling';

describe('next-node.js', () => {

    document.body.innerHTML =
        '<p id="first">the quick brown</p>' +
        '<p id="second"><hr>fox jumps over</p>' +
        '<p id="third">the lazy dog</p>';

    const first = document.getElementById('first');
    const second = document.getElementById('second');

    it('should return null', () => {
        expect(nextNode()).toBe(null);
        expect(prevNode()).toBe(null);
    })

    it('should return 4 next nodes', () => {
        let nextA = nextNode(first),
            nextB = nextNode(nextA),
            nextC = nextNode(nextB),
            nextD = nextNode(nextC);

        expect(nextA.nodeValue).toBe('the quick brown');
        expect(nextB.id).toBe('second');
        expect(nextC.tagName).toBe('HR');
        expect(nextD.nodeValue).toBe('fox jumps over');
    })

    it('should return 4 next TEXT nodes', () => {
        let type = 3,
            nextA = nextNode(first, type),
            nextB = nextNode(nextA, type),
            nextC = nextNode(nextB, type),
            nextD = nextNode(nextC, type);

        expect(nextA.nodeValue).toBe('the quick brown');
        expect(nextB.nodeValue).toBe('fox jumps over');
        expect(nextC.nodeValue).toBe('the lazy dog');
        expect(nextD).toBe(null);
    })

    it('should return prev node', () => {
        let prev = prevNode(second);
        expect(prev.id).toBe('first');
    })

    it('should return prev TEXT node', () => {
        let prev = prevNode(second, 3);
        expect(prev.nodeValue).toBe('the quick brown');
    })

})