// @flow strict

import {titleCase} from './titleCase';

describe('titleCase()', () => {
  it.each`
    value                                                | expected
    ${'This is my dog.'}                                 | ${'This Is My Dog.'}
    ${'He lives in my house.'}                           | ${'He Lives in My House.'}
    ${'We live in London.'}                              | ${'We Live in London.'}
    ${'My dogs are big.'}                                | ${'My Dogs Are Big.'}
    ${'I like big dogs.'}                                | ${'I Like Big Dogs.'}
    ${'I have two dogs and some rabbits.'}               | ${'I Have Two Dogs and Some Rabbits.'}
    ${'My dog eats quickly.'}                            | ${'My Dog Eats Quickly.'}
    ${'When he is very hungry, he eats really quickly.'} | ${'When He Is Very Hungry, He Eats Really Quickly.'}
    ${'I have a new iPhone.'}                            | ${'I Have a New iPhone.'}
    ${'Hi! How are you?'}                                | ${'Hi! How Are You?'}
    ${"John came but Mary didn't come."}                 | ${"John Came but Mary Didn't Come."}
    ${'Everyone came but Mary.'}                         | ${'Everyone Came but Mary.'}
    ${'Are you well?'}                                   | ${'Are You Well?'}
    ${'She speaks well.'}                                | ${'She Speaks Well.'}
    ${"Well! That's expensive!"}                         | ${"Well! That's Expensive!"}
    ${'We ate in the afternoon.'}                        | ${'We Ate in the Afternoon.'}
    ${'We had afternoon tea.'}                           | ${'We Had Afternoon Tea.'}
    ${'The shuttle flew into space.'}                    | ${'The Shuttle Flew Into Space.'}
    ${'The wise, handsome owl had orange eyes.'}         | ${'The Wise, Handsome Owl Had Orange Eyes.'}
    ${'Go to the store and buy some milk.'}              | ${'Go to the Store and Buy Some Milk.'}
    ${'The tall man took the car to the shop.'}          | ${'The Tall Man Took the Car to the Shop.'}
    ${'I gave my brother an umbrella.'}                  | ${'I Gave My Brother an Umbrella.'}
    ${'He found a book to read.'}                        | ${'He Found a Book to Read.'}
    ${'Do you want some milk?'}                          | ${'Do You Want Some Milk?'}
    ${'In brief, by the end of the 19th century.'}       | ${'In Brief, by the End of the 19th Century.'}
    ${'to be exactly 6.626 km'}                          | ${'To Be Exactly 6.626 Km'}
    ${'Our Capt. Joe likes dogs. for sure!'}             | ${'Our Capt. Joe Likes Dogs. For Sure!'}
  `('uppercases correctly based on POS: $value', ({value, expected}) => {
    expect(titleCase(value)).toBe(expected);
  });
});
