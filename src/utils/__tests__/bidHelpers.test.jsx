import { isStandardBidAllowed } from '../bidHelpers';

describe('helper isStandardBidAllowed', () => {
  const tests = [
    {
      currentLevel: 0, currentSuit: 'PASS', level: 1, suit: 'CLUBS', result: false,
    },
    {
      currentLevel: 2, currentSuit: 'SPADES', level: 2, suit: 'NOTRUMPS', result: false,
    },
    {
      currentLevel: 2, currentSuit: 'NOTRUMPS', level: 3, suit: 'SPADES', result: false,
    },
    {
      currentLevel: 4, currentSuit: 'HEARTS', level: 4, suit: 'DIAMONDS', result: true,
    },
    {
      currentLevel: 5, currentSuit: 'DIAMONDS', level: 4, suit: 'HEARTS', result: true,
    },
  ];

  tests.forEach((test) => {
    it(`After ${test.currentLevel} ${test.currentSuit}, is ${test.level} ${test.suit} allowed? Expect ${test.result}`, () => {
      expect(isStandardBidAllowed(test.currentLevel, test.currentSuit, test.level, test.suit)).toEqual(test.result);
    });
  });
});
