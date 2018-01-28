import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BidButtonBlock from '../BidButtonBlock';
import { POSSIBLE_LEVELS, STANDARD_SUITS, BOOLEANS } from '../../utils/constants';

describe('BidButtonBlock render', () => {
  POSSIBLE_LEVELS.forEach((level) => {
    STANDARD_SUITS.forEach((suit) => {
      BOOLEANS.forEach((isDisabled) => {
        it(`currentLevel: ${level}, currentSuit: ${suit}, shouldDoubleButtonDisabled: ${isDisabled}`, () => {
          const bidButtonBlock = shallow(<BidButtonBlock
            level={level}
            suit={suit}
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
      level={0}
      suit="PASS"
      shouldDoubleButtonDisabled={false}
      shouldRedoubleButtonDisabled={false}
      handleBidButtonClick={() => null}
    />);
    expect(toJson(bidButtonBlock)).toMatchSnapshot();
  });
});
