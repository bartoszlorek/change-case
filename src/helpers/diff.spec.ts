import {stringIndexDiff} from './diff';

describe('stringIndexDiff()', () => {
  it.each([
    {
      input: 'hello mad world',
      output: 'HELLO MAD WORLD',
      expected: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      input: '!hello mad world.',
      output: 'hello_mad_world',
      expected: [NaN, -1, -1, -1, -1, -1, NaN, -1, -1, -1, NaN, -1, -1, -1, -1, -1, NaN],
    },
    {
      input: 'hello mad world',
      output: 'helloMadWorld',
      expected: [0, 0, 0, 0, 0, NaN, -1, -1, -1, NaN, -2, -2, -2, -2, -2],
    },
    {
      input: '.,!uidsog: !@foo $%^adg &*(asd)',
      output: 'UIDSOG_FOO_ADG_ASD',
      expected: [NaN, NaN, NaN, -3, -3, -3, -3, -3, -3, NaN, NaN, NaN, NaN, -6, -6, -6, NaN, NaN, NaN, NaN, -9, -9, -9, NaN, NaN, NaN, NaN, -12, -12, -12, NaN],
    },
    {
      input: '10 foo1 6h 2 30% 2,750.5 1/2',
      output: '10.foo1.6h.2.30.2.750.5.1.2',
      expected: [0, 0, NaN, 0, 0, 0, 0, NaN, 0, 0, NaN, 0, NaN, 0, 0, NaN, NaN, -1, NaN, -1, -1, -1, -1, -1, NaN, -1, NaN, -1],
    },
    {
      input: 'Stanca stă-n castan ca Stan.',
      output: 'stancaStăNCastanCaStan',
      expected: [0, 0, 0, 0, 0, 0, NaN, -1, -1, -1, NaN, -2, NaN, -3, -3, -3, -3, -3, -3, NaN, -4, -4, NaN, -5, -5, -5, -5, NaN],
    },
    {
      input: 'Contact between 9 a.m. and 5 p.m. on a weekday.',
      output: 'contactBetween_9AMAnd_5PMOnAWeekday',
      expected: [0, 0, 0, 0, 0, 0, 0, NaN, -1, -1, -1, -1, -1, -1, -1, NaN, -1, NaN, -2, NaN, -3, NaN, NaN, -5, -5, -5, NaN, -5, NaN, -6, NaN, -7, NaN, NaN, -9, -9, NaN, -10, NaN, -11, -11, -11, -11, -11, -11, -11, NaN],
    },
  ])('diffs from "$input" to "$output"', ({input, output, expected}) => {
    expect(stringIndexDiff(input, output)).toEqual(expected);
  });
});
