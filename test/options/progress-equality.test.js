import { isEqualWith } from 'lodash';
import progressEquality from '../../src/options/utils/progress-equality';

describe('progress-equality.js', () => {

    it('test simple primitives', () => {
        expect(isEqualWith(1, 2, progressEquality)).toBeFalsy();
        expect(isEqualWith(null, 2, progressEquality)).toBeFalsy();
        expect(isEqualWith(true, true, progressEquality)).toBeTruthy();
    })

    it('next object adds falsy value - it\'s equal', () => {
        let prev = {
            same: { value: 'truthy' }
        }
        let next = {
            same: { value: 'truthy' },
            falsy: ''
        }
        expect(isEqualWith(prev, next, progressEquality))
            .toBeTruthy();
    })

    it('next object adds truthy value - it\'s NOT equal', () => {
        let prev = {
            same: { value: 'truthy' }
        }
        let next = {
            same: { value: 'truthy' },
            truthy: 'truthy'
        }
        expect(isEqualWith(prev, next, progressEquality))
            .toBeFalsy();
    })

    it('next array adds falsy value - it\'s equal', () => {
        let prev = ['first'],
            next = ['first', ''];
        expect(isEqualWith(prev, next, progressEquality))
            .toBeTruthy();
    })

    it('next array adds truthy value - it\'s NOT equal', () => {
        let prev = ['first', ''],
            next = ['first', 'second'];
        expect(isEqualWith(prev, next, progressEquality))
            .toBeFalsy();
    })

    it('next length is greater than prev - it\'s equal', () => {
        let prev = ['first', ''],
            next = ['first', '', null];
        expect(isEqualWith(prev, next, progressEquality))
            .toBeTruthy();
    })

    it('prev length is greater than next - it\'s NOT equal', () => {
        let prev = ['first', '', 'third'],
            next = ['first', 'second'];
        expect(isEqualWith(prev, next, progressEquality))
            .toBeFalsy();
    })

})