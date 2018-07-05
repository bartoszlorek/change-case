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

describe('usage', () => {
    it('should remove non-word characters', () => {
        let sentence = noCase('The quick brown fox, which jumps over...')
        expect(sentence).toEqual('the quick brown fox which jumps over')
    })
})

describe('conversion', () => {
    let sentence = noCase('fox jumps over the lazy dog')
    expect(sentence).toEqual('fox jumps over the lazy dog')

    it('noCase -> upperCase', () => {
        expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('noCase -> lowerCase', () => {
        expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('noCase -> titleCase', () => {
        expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog')
    })
    it('noCase -> sentenceCase', () => {
        expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog')
    })

    it('noCase -> camelCase', () => {
        expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog')
    })
    it('noCase -> pascalCase', () => {
        expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog')
    })
    it('noCase -> constantCase', () => {
        expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG')
    })

    it('noCase -> paramCase', () => {
        expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog')
    })
    it('noCase -> snakeCase', () => {
        expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog')
    })
    it('noCase -> dotCase', () => {
        expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog')
    })

    it('noCase -> toggleCase', () => {
        expect(toggleCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG')
    })
    it('noCase -> noAccents', () => {
        expect(noAccents(sentence)).toEqual('fox jumps over the lazy dog')
    })
    it('noCase -> noCase', () => {
        expect(noCase(sentence)).toEqual('fox jumps over the lazy dog')
    })  
})