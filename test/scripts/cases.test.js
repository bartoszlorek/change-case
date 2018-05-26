import cases from '../../src/scripts/cases'
const { sentenceCase } = cases

describe('sentenceCase', () => {
    it('should handle multiple sentences', () => {
        const result = sentenceCase('WHERE ARE MY KEYS? OH! THEY ARE... HERE.')
        expect(result).toEqual('Where are my keys? Oh! They are... here.')
    })

    it('should handle abbreviations', () => {
        const result = sentenceCase(
            'WHERE ARE YOU? OH!  YOU ARE E.G. THERE. ARE WE E.G. HERE?'
        )
        expect(result).toEqual(
            'Where are you? Oh!  You are e.g. there. Are we e.g. here?'
        )
    })
})
