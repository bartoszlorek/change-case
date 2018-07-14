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
    let sentence = snakeCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('fox_jumps_over_the_lazy_dog')

    it('snakeCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })
    it('snakeCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('snakeCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('snakeCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox_jumps_over_the_lazy_dog')
    })

    it('snakeCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('snakeCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('snakeCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('snakeCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('snakeCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('snakeCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('snakeCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })
    it('snakeCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('snakeCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})