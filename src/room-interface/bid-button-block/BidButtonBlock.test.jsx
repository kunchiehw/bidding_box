import React from 'react';
import { shallow } from 'enzyme';
import SuitBidButton from './SuitBidButton';

it('renders SuitBidButton without crashing', () => {
  const testProp1 = {
    bid: { level: 1, suit: 'CLUBS' },
    curBid: null,
    handleClick: () => null,
    shouldDisabled: true,
  };

  shallow(<SuitBidButton {...testProp1} />);

  const testProp2 = {
    bid: { level: 3, suit: 'HEARTS' },
    curBid: testProp1.bid,
    handleClick: () => null,
    shouldDisabled: false,
  };

  shallow(<SuitBidButton {...testProp2} />);
});
