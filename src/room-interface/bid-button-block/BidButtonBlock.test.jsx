import React from 'react';
import { shallow } from 'enzyme';
import SuitBidButton, { suitBidButtonDisabled } from './SuitBidButton';
import OtherBidButton from './OtherBidButton';
import BidButtonBlock from './BidButtonBlock';

it('SuitBidButton render', () => {
  const prop1 = {
    bid: {
      level: 3,
      suit: 'NOTRUMPS',
    },
    curBid: null,
    handleClick: () => null,
    isDisabled: false,
  };

  shallow(<SuitBidButton {...prop1} />);

  const prop2 = {
    bid: {
      level: 2,
      suit: 'HEARTS',
    },
    curBid: {
      level: 4,
      suit: 'SPADES',
    },
    handleClick: bid => bid,
    isDisabled: true,
  };

  shallow(<SuitBidButton {...prop2} />);
});

it('SuitBidButton function suitBidButtonDisabled', () => {
  expect(suitBidButtonDisabled(null, { level: 1, suit: 'CLUBS' })).toEqual(false);
  expect(suitBidButtonDisabled({ level: 2, suit: 'SPADES' }, { level: 2, suit: 'NOTRUMPS' })).toEqual(false);
  expect(suitBidButtonDisabled({ level: 2, suit: 'NOTRUMPS' }, { level: 3, suit: 'SPADES' })).toEqual(false);
});

it('OtherBidButton render', () => {
  const prop1 = {
    suit: 'PASS',
    handleClick: () => null,
    isDisabled: false,
  };

  shallow(<OtherBidButton {...prop1} />);

  const prop2 = {
    suit: 'REDOUBLE',
    handleClick: bid => bid,
    isDisabled: true,
  };

  shallow(<OtherBidButton {...prop2} />);
});

it('BidButtonBlock render', () => {
  const prop1 = {
    curBid: null,
    disabledDouble: true,
    disabledRedouble: true,
    handleClick: () => null,
    isDisabled: false,
  };

  shallow(<BidButtonBlock {...prop1} />);

  const prop2 = {
    curBid: {
      level: 1,
      suit: 'NOTRUMPS',
    },
    disabledDouble: true,
    disabledRedouble: false,
    handleClick: bid => bid,
    isDisabled: false,
  };

  shallow(<BidButtonBlock {...prop2} />);

  const prop3 = {
    curBid: {
      level: 7,
      suit: 'SPADES',
    },
    disabledDouble: false,
    disabledRedouble: true,
    handleClick: () => null,
    isDisabled: true,
  };

  shallow(<BidButtonBlock {...prop3} />);
});
