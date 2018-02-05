import { isStandardBidAllowed } from '../bidHelpers';

describe('helper isStandardBidAllowed', () => {
  const tests = [
    {
      newLevel: 1, newSuit: 'CLUBS', level: 0, suit: 'PASS', result: true,
    },
    {
      newLevel: 1, newSuit: 'CLUBS', level: 1, suit: 'CLUBS', result: false,
    },
    {
      newLevel: 2, newSuit: 'SPADES', level: 2, suit: 'NOTRUMPS', result: false,
    },
    {
      newLevel: 2, newSuit: 'NOTRUMPS', level: 3, suit: 'SPADES', result: false,
    },
    {
      newLevel: 4, newSuit: 'HEARTS', level: 4, suit: 'DIAMONDS', result: true,
    },
    {
      newLevel: 5, newSuit: 'DIAMONDS', level: 4, suit: 'HEARTS', result: true,
    },
  ];

  tests.forEach((test) => {
    it(`After ${test.level} ${test.suit}, is ${test.newLevel} ${test.newSuit} allowed? Expect ${test.result}`, () => {
      expect(isStandardBidAllowed(test.newLevel, test.newSuit, test.level, test.suit)).toEqual(test.result);
    });
  });
});
