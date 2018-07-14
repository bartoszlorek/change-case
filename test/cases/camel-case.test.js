import cases from '../../src/scripts/cases/index'
const {
    upperCase,
    lowerCase,
    titleCase,
    sentenceCase,

    camelCase,
    pascalCase,
    constantCase,

    paramCase,
    snakeCase,
    dotCase,

    toggleCase,
    noAccents,
    noCase
} = cases

describe('conversion', () => {
    let sentence = camelCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('foxJumpsOverTheLazyDog')

    it('camelCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOXJUMPSOVERTHELAZYDOG')
    })
    it('camelCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('foxjumpsoverthelazydog')
    })
    it('camelCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('camelCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog')
    })

    it('camelCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('camelCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('camelCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('camelCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('camelCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('camelCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('camelCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('FOXjUMPSoVERtHElAZYdOG')
    })
    it('camelCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('camelCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})