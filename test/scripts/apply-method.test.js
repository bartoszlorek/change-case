import applyMethod from '../../src/scripts/apply-method'
import cases from '../../src/scripts/cases'
const { upperCase } = cases

describe('apply-method.js', () => {
    it('should return rejected promise', () => {
        expect(applyMethod(10)).rejects.toBeFalsy()
    })

    it('should return resolves to method', () => {
        expect(applyMethod('upperCase')).resolves.toBe(upperCase)
    })

    it('should apply filter to the method', () => {
        const filter = jest.fn(method => value => {
            return method(value) + '...'
        })
        applyMethod('upperCase', filter).then(method => {
            const result = method('read more')
            expect(result).toBe('READ MORE...')
        })
        expect(filter).toHaveBeenCalledTimes(1)
    })
})
