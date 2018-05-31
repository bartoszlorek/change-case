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
    let sentence = pascalCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('FoxJumpsOverTheLazyDog')

    it('pascalCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOXJUMPSOVERTHELAZYDOG')
    })
    it('pascalCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('foxjumpsoverthelazydog')
    })
    it('pascalCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('pascalCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog')
    })

    it('pascalCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('pascalCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('pascalCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('pascalCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('pascalCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('pascalCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('pascalCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('fOXjUMPSoVERtHElAZYdOG')
    })
    it('pascalCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('pascalCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})