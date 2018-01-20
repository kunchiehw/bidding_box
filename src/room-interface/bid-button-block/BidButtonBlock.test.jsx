import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BidButton from './BidButton';
import BidButtonBlock from './BidButtonBlock';
import { shouldStandardBidButtonDisabled } from './helper-BidButtonBlock';
import { POSSIBLE_LEVELS, STANDARD_SUITS, SPECIAL_SUITS, BOOLEAN_CHOICES } from '../../util/util';

describe('helper shouldStandardBidButtonDisabled', () => {
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
    it(`After ${test.currentLevel} ${test.currentSuit}, should ${test.level} ${test.suit} disabled? Expect ${test.result}`, () => {
      expect(shouldStandardBidButtonDisabled(test.currentLevel, test.currentSuit, test.level, test.suit)).toEqual(test.result);
    });
  });
});

describe('BidButton render', () => {
  POSSIBLE_LEVELS.forEach((level) => {
    STANDARD_SUITS.forEach((suit) => {
      BOOLEAN_CHOICES.forEach((isDisabled) => {
        it(`level: ${level}; suit: ${suit}, isDisabled: ${isDisabled}`, () => {
          const bidButton = shallow(<BidButton
            level={level}
            suit={suit}
            isDisabled={isDisabled}
            handleBidButtonClick={() => null}
          />);
          expect(toJson(bidButton)).toMatchSnapshot();
        });
      });
    });
  });

  SPECIAL_SUITS.forEach((suit) => {
    BOOLEAN_CHOICES.forEach((isDisabled) => {
      it(`suit: ${suit}, isDisabled: ${isDisabled}`, () => {
        const bidButton = shallow(<BidButton
          level={0}
          suit={suit}
          isDisabled={isDisabled}
          handleBidButtonClick={() => null}
        />);
        expect(toJson(bidButton)).toMatchSnapshot();
      });
    });
  });
});

describe('BidButtonBlock render', () => {
  POSSIBLE_LEVELS.forEach((level) => {
    STANDARD_SUITS.forEach((suit) => {
      BOOLEAN_CHOICES.forEach((isDisabled) => {
        it(`currentLevel: ${level}, currentSuit: ${suit}, shouldDoubleButtonDisabled: ${isDisabled}`, () => {
          const bidButtonBlock = shallow(<BidButtonBlock
            currentLevel={level}
            currentSuit={suit}
            shouldDoubleButtonDisabled={isDisabled}
            shouldRedoubleButtonDisabled={!isDisabled}
            handleBidButtonClick={() => null}
          />);
          expect(toJson(bidButtonBlock)).toMatchSnapshot();
        });
      });
    });
  });

  it('currentSuit: "PASS', () => {
    const bidButtonBlock = shallow(<BidButtonBlock
      currentLevel={0}
      currentSuit="PASS"
      shouldDoubleButtonDisabled={false}
      shouldRedoubleButtonDisabled={false}
      handleBidButtonClick={() => null}
    />);
    expect(toJson(bidButtonBlock)).toMatchSnapshot();
  });
});
