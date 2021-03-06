import markdown from './markdown';

describe('markdown()', () => {
  it('should return whole string', () => {
    const sentence = 'press "Delete"';
    const failed = [
      {
        mark: null,
        prop: null,
        text: sentence
      }
    ];
    expect(markdown('', ['*'])[0].text).toBe('');
    expect(markdown(sentence)).toEqual(failed);
    expect(markdown(sentence, null)).toEqual(failed);
    expect(markdown(sentence, [])).toEqual(failed);
  });

  it('throws on opening tag without closing', () => {
    expect(() => {
      markdown('not *asterisk "quote" end', ['*', '"']);
    }).toThrow(`There is opening tag '"' instead of closing '*' at index 14.`);
  });

  it('string starts with no mark', () => {
    let result = markdown('not *asterisk*', ['*']);
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '*', prop: null, text: 'asterisk'}
    ]);
  });

  it('string starts with mark', () => {
    let result = markdown('*asterisk* to end', ['*']);
    expect(result).toEqual([
      {mark: '*', prop: null, text: 'asterisk'},
      {mark: null, prop: null, text: ' to end'}
    ]);
  });

  it('string with multiple marks', () => {
    let result = markdown('not "quote" and "again" to end', ['"']);
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '"', prop: null, text: 'quote'},
      {mark: null, prop: null, text: ' and '},
      {mark: '"', prop: null, text: 'again'},
      {mark: null, prop: null, text: ' to end'}
    ]);
  });

  it('string with multiple different marks', () => {
    let result = markdown('not *asterisk* "quote" to end', ['*', '"']);
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '*', prop: null, text: 'asterisk'},
      {mark: null, prop: null, text: ' '},
      {mark: '"', prop: null, text: 'quote'},
      {mark: null, prop: null, text: ' to end'}
    ]);
  });

  it('string with multiple marks next to each other', () => {
    let result = markdown('not *asterisk*"quote" to end', ['*', '"']);
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '*', prop: null, text: 'asterisk'},
      {mark: '"', prop: null, text: 'quote'},
      {mark: null, prop: null, text: ' to end'}
    ]);
  });

  it('marks with different opening and closing tag', () => {
    let result = markdown('not (parentheses) to end', ['()']);
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '()', prop: null, text: 'parentheses'},
      {mark: null, prop: null, text: ' to end'}
    ]);
  });

  it('mark with double opening tag', () => {
    let result = markdown('not ((parentheses) to end', ['()']);
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '()', prop: null, text: '(parentheses'},
      {mark: null, prop: null, text: ' to end'}
    ]);
  });

  it('mark with double closing tag', () => {
    let result = markdown('not (parentheses)) to end', ['()']);
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '()', prop: null, text: 'parentheses'},
      {mark: null, prop: null, text: ') to end'}
    ]);
  });

  it('mark with prop', () => {
    let result = markdown('not [click](url) to end', ['[]'], '()');
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '[]', prop: 'url', text: 'click'},
      {mark: null, prop: null, text: ' to end'}
    ]);
  });

  it('ignore parentheses not being mark props', () => {
    let result = markdown('not [click] (not url) to end', ['[]'], '()');
    expect(result).toEqual([
      {mark: null, prop: null, text: 'not '},
      {mark: '[]', prop: null, text: 'click'},
      {mark: null, prop: null, text: ' (not url) to end'}
    ]);
  });
});
