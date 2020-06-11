// @flow strict

import {camelCase} from './camelCase';

describe('camelCase()', () => {
  it.each`
    value                                                  | expected
    ${'This is my dog.'}                                   | ${'thisIsMyDog'}
    ${'He lives in my house.'}                             | ${'heLivesInMyHouse'}
    ${'We live in London.'}                                | ${'weLiveInLondon'}
    ${'My dogs are big.'}                                  | ${'myDogsAreBig'}
    ${'I like big dogs.'}                                  | ${'iLikeBigDogs'}
    ${'I have two dogs and some rabbits.'}                 | ${'iHaveTwoDogsAndSomeRabbits'}
    ${'My dog eats quickly.'}                              | ${'myDogEatsQuickly'}
    ${'When he is very hungry, he eats really quickly.'}   | ${'whenHeIsVeryHungryHeEatsReallyQuickly'}
    ${'I have a new iPhone.'}                              | ${'iHaveANewIphone'}
    ${'Hi! How are you?'}                                  | ${'hiHowAreYou'}
    ${"John came but Mary didn't come."}                   | ${'johnCameButMaryDidnTCome'}
    ${'Everyone came but Mary.'}                           | ${'everyoneCameButMary'}
    ${'Are you well?'}                                     | ${'areYouWell'}
    ${'She speaks well.'}                                  | ${'sheSpeaksWell'}
    ${"Well! That's expensive!"}                           | ${'wellThatSExpensive'}
    ${'We ate in the afternoon.'}                          | ${'weAteInTheAfternoon'}
    ${'We had afternoon tea.'}                             | ${'weHadAfternoonTea'}
    ${'The shuttle flew into space.'}                      | ${'theShuttleFlewIntoSpace'}
    ${'The wise, handsome owl had orange eyes.'}           | ${'theWiseHandsomeOwlHadOrangeEyes'}
    ${'Go to the store and buy some milk.'}                | ${'goToTheStoreAndBuySomeMilk'}
    ${'The tall man took the car to the shop.'}            | ${'theTallManTookTheCarToTheShop'}
    ${'I gave my brother an umbrella.'}                    | ${'iGaveMyBrotherAnUmbrella'}
    ${'He found a book to read.'}                          | ${'heFoundABookToRead'}
    ${'Do you want some milk?'}                            | ${'doYouWantSomeMilk'}
    ${'Let’s Make a Deal, but The A to Z of TV Gardening'} | ${'letSMakeADealButTheAToZOfTvGardening'}
    ${'Stand by Me, but Stand By for Action'}              | ${'standByMeButStandByForAction'}
    ${'In brief, by the end of the 19th century.'}         | ${'inBriefByTheEndOfThe_19thCentury'}
    ${'to be exactly 6.626 km'}                            | ${'toBeExactly_6_626Km'}
    ${'Our Capt. Joe likes dogs. For sure!'}               | ${'ourCaptJoeLikesDogsForSure'}
  `('$value ----> $expected', ({value, expected}) => {
    expect(camelCase(value)).toBe(expected);
  });
});
