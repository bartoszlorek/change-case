import deepFilter from '../../src/options/utils/deep-filter';
import { isTruthy } from '../../src/options/utils/type-conversion';

describe('deep-filter.js', () => {

    it('should return null after falsy', () => {
        expect(deepFilter(null, isTruthy)).toBe(null);
        expect(deepFilter('', isTruthy)).toBe(null);
    })

    it('should remove empty items', () => {
        let data = ['', null];
        expect(deepFilter(data, isTruthy))
            .toEqual([]);
    })

    it('should remove empty properties', () => {
        let data = {
            blacklist: '',
            shortcuts: ['', null]
        }
        expect(deepFilter(data, isTruthy))
            .toEqual({});
    })

    it('should return filtered data', () => {
        let data = {
            blacklist: '',
            shortcuts: {
                upperCase: 'alt+1',
                lowerCase: '',
                titleCase: 'alt+3',
                camelCase: null
            },
            list: [
                null,
                'ctrl+1',
                'ctrl+2',
                ''
            ]
        }
        let result = {
            shortcuts: {
                upperCase: 'alt+1',
                titleCase: 'alt+3'
            },
            list: [
                'ctrl+1',
                'ctrl+2'
            ]
        }
        expect(deepFilter(data, isTruthy))
            .toEqual(result);
    })

})