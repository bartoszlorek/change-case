import cases from '../../src/scripts/cases'
const { sentenceCase } = cases

describe('sentenceCase', () => {
    it('should handle single sentence', () => {
        const result = sentenceCase('fox jumps over the lazy dog.')
        expect(result).toEqual('Fox jumps over the lazy dog.')
    })

    it('should handle one and a half of sentence', () => {
        const result = sentenceCase('yes, i said. it is pretty to')
        expect(result).toEqual('Yes, i said. It is pretty to')
    })

    it('should handle sentence without delimiters', () => {
        const result = sentenceCase('fox jumps over the lazy dog')
        expect(result).toEqual('Fox jumps over the lazy dog')
    })

    it('should handle multiple sentences', () => {
        const result = sentenceCase('WHERE ARE MY KEYS? OH! THEY ARE... HERE.')
        expect(result).toEqual('Where are my keys? Oh! They are... here.')
    })

    it('should handle short abbreviations', () => {
        const result = sentenceCase('YOU ARE E.G. THERE.  ARE WE ALT. HERE?')
        expect(result).toEqual('You are e.g. there.  Are we alt. here?')
    })

    it('should handle long abbreviations', () => {
        const result = sentenceCase('HELLO MR. AND SGT. DOGGY!')
        expect(result).toEqual('Hello mr. and sgt. doggy!')
    })

    it('should handle capital letter abbreviations', () => {
        const result = sentenceCase('hello Mr. and Sgt. Doggy!')
        expect(result).toEqual('Hello mr. and sgt. doggy!')
    })
})
