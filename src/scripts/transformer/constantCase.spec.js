// @flow strict

import {constantCase} from './constantCase';

describe('constantCase()', () => {
  it.each`
    value                                                  | expected
    ${'This is my dog.'}                                   | ${'THIS_IS_MY_DOG'}
    ${'He lives in my house.'}                             | ${'HE_LIVES_IN_MY_HOUSE'}
    ${'We live in London.'}                                | ${'WE_LIVE_IN_LONDON'}
    ${'My dogs are big.'}                                  | ${'MY_DOGS_ARE_BIG'}
    ${'I like big dogs.'}                                  | ${'I_LIKE_BIG_DOGS'}
    ${'I have two dogs and some rabbits.'}                 | ${'I_HAVE_TWO_DOGS_AND_SOME_RABBITS'}
    ${'My dog eats quickly.'}                              | ${'MY_DOG_EATS_QUICKLY'}
    ${'When he is very hungry, he eats really quickly.'}   | ${'WHEN_HE_IS_VERY_HUNGRY_HE_EATS_REALLY_QUICKLY'}
    ${'I have a new iPhone.'}                              | ${'I_HAVE_A_NEW_IPHONE'}
    ${'Hi! How are you?'}                                  | ${'HI_HOW_ARE_YOU'}
    ${"John came but Mary didn't come."}                   | ${'JOHN_CAME_BUT_MARY_DIDN_T_COME'}
    ${'Everyone came but Mary.'}                           | ${'EVERYONE_CAME_BUT_MARY'}
    ${'Are you well?'}                                     | ${'ARE_YOU_WELL'}
    ${'She speaks well.'}                                  | ${'SHE_SPEAKS_WELL'}
    ${"Well! That's expensive!"}                           | ${'WELL_THAT_S_EXPENSIVE'}
    ${'We ate in the afternoon.'}                          | ${'WE_ATE_IN_THE_AFTERNOON'}
    ${'We had afternoon tea.'}                             | ${'WE_HAD_AFTERNOON_TEA'}
    ${'The shuttle flew into space.'}                      | ${'THE_SHUTTLE_FLEW_INTO_SPACE'}
    ${'The wise, handsome owl had orange eyes.'}           | ${'THE_WISE_HANDSOME_OWL_HAD_ORANGE_EYES'}
    ${'Go to the store and buy some milk.'}                | ${'GO_TO_THE_STORE_AND_BUY_SOME_MILK'}
    ${'The tall man took the car to the shop.'}            | ${'THE_TALL_MAN_TOOK_THE_CAR_TO_THE_SHOP'}
    ${'I gave my brother an umbrella.'}                    | ${'I_GAVE_MY_BROTHER_AN_UMBRELLA'}
    ${'He found a book to read.'}                          | ${'HE_FOUND_A_BOOK_TO_READ'}
    ${'Do you want some milk?'}                            | ${'DO_YOU_WANT_SOME_MILK'}
    ${'Let’s Make a Deal, but The A to Z of TV Gardening'} | ${'LET_S_MAKE_A_DEAL_BUT_THE_A_TO_Z_OF_TV_GARDENING'}
    ${'Stand by Me, but Stand By for Action'}              | ${'STAND_BY_ME_BUT_STAND_BY_FOR_ACTION'}
    ${'In brief, by the end of the 19th century.'}         | ${'IN_BRIEF_BY_THE_END_OF_THE_19TH_CENTURY'}
    ${'to be exactly 6.626 km'}                            | ${'TO_BE_EXACTLY_6_626_KM'}
    ${'Our Capt. Joe likes dogs. For sure!'}               | ${'OUR_CAPT_JOE_LIKES_DOGS_FOR_SURE'}
  `('$value ———— $expected', ({value, expected}) => {
    expect(constantCase(value)).toBe(expected);
  });
});
