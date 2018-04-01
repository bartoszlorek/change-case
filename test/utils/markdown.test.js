import markdown from '../../src/.utils/react/markdown'

describe('markdown.js', () => {
    it('should return whole string', () => {
        const sentence = 'press "Delete"'
        const failed = [{
            mark: null,
            text: sentence
        }]
        expect(markdown('', ['*'])[0].text).toBe('')
        expect(markdown(sentence)).toEqual(failed)
        expect(markdown(sentence, null)).toEqual(failed)
        expect(markdown(sentence, [])).toEqual(failed)
    })

    it('should return mark at the begin', () => {
        const result = markdown('"Delete" to remove', ['"'])

        expect(result.length).toBe(2)
        expect(result[0]).toEqual({
            mark: '"',
            text: 'Delete'
        })
        expect(result[1]).toEqual({
            mark: null,
            text: ' to remove'
        })
    })

    it('should return mark at the end', () => {
        const result = markdown('press "Delete"', ['"'])

        expect(result.length).toBe(2)
        expect(result[0]).toEqual({
            mark: null,
            text: 'press '
        })
        expect(result[1]).toEqual({
            mark: '"',
            text: 'Delete'
        })
    })

    it('should handle multiple marks', () => {
        const sentence = 'press "Delete" to remove and you *MUST* reload'
        const result = markdown(sentence, ['"', '*'])

        expect(result.length).toBe(5)
        expect(result[0]).toEqual({
            mark: null,
            text: 'press '
        })
        expect(result[1]).toEqual({
            mark: '"',
            text: 'Delete'
        })
        expect(result[2]).toEqual({
            mark: null,
            text: ' to remove and you '
        })
        expect(result[3]).toEqual({
            mark: '*',
            text: 'MUST'
        })
        expect(result[4]).toEqual({
            mark: null,
            text: ' reload'
        })
    })
})
