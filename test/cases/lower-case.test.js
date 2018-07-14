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
    let sentence = lowerCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('fox jumps over the lazy dog')

    it('lowerCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('lowerCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('lowerCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('lowerCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog')
    })

    it('lowerCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('lowerCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('lowerCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('lowerCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('lowerCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('lowerCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('lowerCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('lowerCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('lowerCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})