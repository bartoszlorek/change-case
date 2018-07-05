import cases from '../../src/scripts/cases/case-methods'
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
    let sentence = toggleCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('FOX JUMPS OVER THE LAZY DOG')

    it('toggleCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('toggleCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('toggleCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('toggleCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog')
    })

    it('toggleCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('toggleCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('toggleCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('toggleCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('toggleCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('toggleCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('toggleCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('toggleCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('toggleCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})