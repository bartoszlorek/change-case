import cases from '../../src/scripts/cases'
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
    let sentence = noAccents('fox jumps over the lazy dog')
    expect(sentence).toEqual('fox jumps over the lazy dog')

    it('noAccents -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('noAccents -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('noAccents -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('noAccents -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog')
    })

    it('noAccents -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('noAccents -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('noAccents -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('noAccents -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('noAccents -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('noAccents -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('noAccents -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('noAccents -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('noAccents -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})