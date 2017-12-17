import React from 'react';
import { shallow } from 'enzyme';
import SeatRow from './SeatRow';
import BidBlock from './BidBlock';
import BidSequenceDisplay from './BidSequenceDisplay';

it('SeatRow render', () => {
  const prop1 = {
    vulnerability: 'NONE',
  };
  shallow(<SeatRow {...prop1} />);

  const prop2 = {
    vulnerability: 'NS',
  };
  shallow(<SeatRow {...prop2} />);

  const prop3 = {
    vulnerability: 'BOTH',
  };
  shallow(<SeatRow {...prop3} />);
});

it('BidBlock render', () => {
  const prop1 = {
    dealer: 'NORTH',
    bidSeq: [],
  };
  shallow(<BidBlock {...prop1} />);

  const prop2 = {
    dealer: 'EAST',
    bidSeq: [{ level: 1, suit: 'CLUBS' }, { level: 2, suit: 'DIAMONDS' }, { level: 3, suit: 'HEARTS' },
      { level: 4, suit: 'SPADES' }, { level: 5, suit: 'NOTRUMPS' }],
  };
  shallow(<BidBlock {...prop2} />);

  const prop3 = {
    dealer: 'EAST',
    bidSeq: [{ level: 6, suit: 'CLUBS' }, { level: null, suit: 'DOUBLE' }, { level: null, suit: 'REDOUBLE' },
      { level: null, suit: 'PASS' }, { level: null, suit: 'PASS' }, { level: null, suit: 'PASS' }],
  };

  shallow(<BidBlock {...prop3} />);
});

it('BidSequenceDisplay render', () => {
  const prop1 = {
    dealer: 'NORTH',
    vulnerability: 'NONE',
    bidSeq: [],
  };
  shallow(<BidSequenceDisplay {...prop1} />);
});
