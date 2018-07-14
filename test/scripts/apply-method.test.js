import useMethod from '../../src/scripts/use-method'
import cases from '../../src/scripts/cases/index'
const { upperCase } = cases

describe('use-method.js', () => {
    it('should return rejected promise', () => {
        expect(useMethod(10)).rejects.toBeFalsy()
    })

    it('should return resolves to method', () => {
        expect(useMethod('upperCase')).resolves.toBe(upperCase)
    })

    it('should apply operators to the method', () => {
        const operators = jest.fn(method => value => method(value) + '...')

        useMethod('upperCase', operators).then(method => {
            const result = method('read more')
            expect(result).toBe('READ MORE...')
        })
        expect(operators).toHaveBeenCalledTimes(1)
    })
})
