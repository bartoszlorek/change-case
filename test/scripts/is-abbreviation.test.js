import isAbbreviation from '../../src/scripts/internal/is-abbreviation'

it('should handle errors', () => {
    expect(isAbbreviation()).toBe(false)
    expect(isAbbreviation(null)).toBe(false)
    expect(isAbbreviation('')).toBe(false)
})

it('should handle abbreviation value', () => {
    expect(isAbbreviation('I am A.B.')).toBe(true)
    expect(isAbbreviation('abbr.')).toBe(true)
    expect(isAbbreviation('Acad.')).toBe(true)
    expect(isAbbreviation('and now A.D.')).toBe(true)
    expect(isAbbreviation('alt.')).toBe(true)
    expect(isAbbreviation('hello Capt.')).toBe(true)
    expect(isAbbreviation('Sgt.')).toBe(true)
})

it('should handle non-abbreviation value', () => {
    expect(isAbbreviation('ok')).toBe(false)
    expect(isAbbreviation('doggy.')).toBe(false)
    expect(isAbbreviation('Mom?')).toBe(false)
    expect(isAbbreviation('there.')).toBe(false)
})