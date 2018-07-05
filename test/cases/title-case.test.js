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
    let sentence = titleCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('Fox Jumps Over the Lazy Dog')

    it('titleCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('titleCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('titleCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('titleCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog')
    })

    it('titleCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('titleCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('titleCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('titleCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('titleCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('titleCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('titleCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('fOX jUMPS oVER THE lAZY dOG')
    })
    it('titleCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('titleCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})