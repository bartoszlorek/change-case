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
    let sentence = dotCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('fox.jumps.over.the.lazy.dog')

    it('dotCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOX.JUMPS.OVER.THE.LAZY.DOG')
    })
    it('dotCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })
    it('dotCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('dotCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox.jumps.Over.the.lazy.Dog')
    })

    it('dotCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('dotCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('dotCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('dotCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('dotCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('dotCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('dotCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('FOX.JUMPS.OVER.THE.LAZY.DOG')
    })
    it('dotCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })
    it('dotCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})