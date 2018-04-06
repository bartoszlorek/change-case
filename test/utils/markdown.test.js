import markdown from '../../src/.utils/react/markdown'

describe('markdown.js', () => {
    it('should return whole string', () => {
        const sentence = 'press "Delete"'
        const failed = [{ mark: null, text: sentence }]
        expect(markdown('', ['*'])[0].text).toBe('')
        expect(markdown(sentence)).toEqual(failed)
        expect(markdown(sentence, null)).toEqual(failed)
        expect(markdown(sentence, [])).toEqual(failed)
    })

    it('should return mark at the begin', () => {
        const result = markdown('"Delete" to remove', ['"'])
        expect(result).toEqual([
            { mark: '"', text: 'Delete' },
            { mark: null, text: ' to remove' }
        ])
    })

    it('should return mark at the end', () => {
        const result = markdown('press "Delete"', ['"'])
        expect(result).toEqual([
            { mark: null, text: 'press ' },
            { mark: '"', text: 'Delete' }
        ])
    })

    it('should handle multiple marks', () => {
        const sentence = 'press "Delete" to remove and you *MUST* reload'
        const result = markdown(sentence, ['"', '*'])
        expect(result).toEqual([
            { mark: null, text: 'press ' },
            { mark: '"', text: 'Delete' },
            { mark: null, text: ' to remove and you ' },
            { mark: '*', text: 'MUST' },
            { mark: null, text: ' reload' }
        ])
    })

    it('should handle marks next to each other', () => {
        const result = markdown('"first"*second*', ['"', '*'])
        expect(result).toEqual([
            { mark: '"', text: 'first' },
            { mark: '*', text: 'second' }
        ])
    })
})
