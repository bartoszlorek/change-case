import sanitizeWith from '../../src/options/utils/sanitize-with';
import { isTruthy } from '../../src/options/utils/type-conversion';

describe('sanitize-with.js', () => {

    const data = {
        blacklist: '',
        shortcuts: {
            camelCase: 'alt+1',
            lowerCase: '',
            sentenceCase: 'alt+3',
            titleCase: null
        },
        list: [
            'ctrl+1',
            'ctrl+2',
            '',
            'shift+3'
        ]
    }

    it('return sanitized data', () => {
        expect(sanitizeWith(
            data, isTruthy
        )).toEqual({
            shortcuts: {
                camelCase: 'alt+1',
                sentenceCase: 'alt+3'
            },
            list: [
                'ctrl+1',
                'ctrl+2',
                'shift+3'
            ]
        })
    })

})