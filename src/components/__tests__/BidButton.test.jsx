import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BidButton from '../BidButton';
import { POSSIBLE_LEVELS, STANDARD_SUITS, SPECIAL_SUITS, BOOLEAN_CHOICES } from '../../utils/constants';

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
