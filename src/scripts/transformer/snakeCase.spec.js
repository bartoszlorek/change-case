// @flow strict

import {snakeCase} from './snakeCase';

describe('snakeCase()', () => {
  it.each`
    value                                                  | expected
    ${'This is my dog.'}                                   | ${'this_is_my_dog'}
    ${'He lives in my house.'}                             | ${'he_lives_in_my_house'}
    ${'We live in London.'}                                | ${'we_live_in_london'}
    ${'My dogs are big.'}                                  | ${'my_dogs_are_big'}
    ${'I like big dogs.'}                                  | ${'i_like_big_dogs'}
    ${'I have two dogs and some rabbits.'}                 | ${'i_have_two_dogs_and_some_rabbits'}
    ${'My dog eats quickly.'}                              | ${'my_dog_eats_quickly'}
    ${'When he is very hungry, he eats really quickly.'}   | ${'when_he_is_very_hungry_he_eats_really_quickly'}
    ${'I have a new iPhone.'}                              | ${'i_have_a_new_iphone'}
    ${'Hi! How are you?'}                                  | ${'hi_how_are_you'}
    ${"John came but Mary didn't come."}                   | ${'john_came_but_mary_didn_t_come'}
    ${'Everyone came but Mary.'}                           | ${'everyone_came_but_mary'}
    ${'Are you well?'}                                     | ${'are_you_well'}
    ${'She speaks well.'}                                  | ${'she_speaks_well'}
    ${"Well! That's expensive!"}                           | ${'well_that_s_expensive'}
    ${'We ate in the afternoon.'}                          | ${'we_ate_in_the_afternoon'}
    ${'We had afternoon tea.'}                             | ${'we_had_afternoon_tea'}
    ${'The shuttle flew into space.'}                      | ${'the_shuttle_flew_into_space'}
    ${'The wise, handsome owl had orange eyes.'}           | ${'the_wise_handsome_owl_had_orange_eyes'}
    ${'Go to the store and buy some milk.'}                | ${'go_to_the_store_and_buy_some_milk'}
    ${'The tall man took the car to the shop.'}            | ${'the_tall_man_took_the_car_to_the_shop'}
    ${'I gave my brother an umbrella.'}                    | ${'i_gave_my_brother_an_umbrella'}
    ${'He found a book to read.'}                          | ${'he_found_a_book_to_read'}
    ${'Do you want some milk?'}                            | ${'do_you_want_some_milk'}
    ${'Let’s Make a Deal, but The A to Z of TV Gardening'} | ${'let_s_make_a_deal_but_the_a_to_z_of_tv_gardening'}
    ${'Stand by Me, but Stand By for Action'}              | ${'stand_by_me_but_stand_by_for_action'}
    ${'In brief, by the end of the 19th century.'}         | ${'in_brief_by_the_end_of_the_19th_century'}
    ${'to be exactly 6.626 km'}                            | ${'to_be_exactly_6_626_km'}
    ${'Our Capt. Joe likes dogs. For sure!'}               | ${'our_capt_joe_likes_dogs_for_sure'}
  `('$value ———— $expected', ({value, expected}) => {
    expect(snakeCase(value)).toBe(expected);
  });
});
