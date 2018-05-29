import cases from '../../src/scripts/cases'
const { sentenceCase } = cases

describe('sentenceCase', () => {
    it('should handle multiple sentences', () => {
        const result = sentenceCase('WHERE ARE MY KEYS? OH! THEY ARE... HERE.')
        expect(result).toEqual('Where are my keys? Oh! They are... here.')
    })

    it('should handle short abbreviations', () => {
        const result = sentenceCase('YOU ARE E.G. THERE.  ARE WE ALT. HERE?')
        expect(result).toEqual('You are e.g. there.  Are we alt. here?')
    })

    it('should handle long abbreviations', () => {
        const result = sentenceCase('HELLO MR. AND PROF. DOGGY!')
        expect(result).toEqual('Hello mr. and prof. doggy!')
    })

    it('should handle capital letter abbreviations', () => {
        const result = sentenceCase('hello Mr. and Prof. Doggy!')
        expect(result).toEqual('Hello mr. and prof. doggy!')
    })
})
