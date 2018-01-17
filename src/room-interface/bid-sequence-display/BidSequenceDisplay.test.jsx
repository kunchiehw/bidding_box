import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SeatRow from './SeatRow';
import BidSequenceBlock from './BidSequenceBlock';
import BidSequenceDisplay from './BidSequenceDisplay';

it('SeatRow render', () => {
  const seatRow1 = shallow(<SeatRow
    vulnerability="NONE"
  />);
  expect(toJson(seatRow1)).toMatchSnapshot();

  const seatRow2 = shallow(<SeatRow
    vulnerability="NS"
  />);
  expect(toJson(seatRow2)).toMatchSnapshot();

  const seatRow3 = shallow(<SeatRow
    vulnerability="BOTH"
  />);
  expect(toJson(seatRow3)).toMatchSnapshot();
});

it('BidSequenceBlock render', () => {
  const bidSequenceBlock1 = shallow(<BidSequenceBlock
    dealer="SOUTH"
    bidSeq={[]}
  />);
  expect(toJson(bidSequenceBlock1)).toMatchSnapshot();

  const bidSequenceBlock2 = shallow(<BidSequenceBlock
    dealer="EAST"
    bidSeq={[
      { level: 1, suit: 'CLUBS' },
      { level: 2, suit: 'DIAMONDS' },
      { level: 3, suit: 'HEARTS' },
      { level: 4, suit: 'SPADES' },
      { level: 5, suit: 'NOTRUMPS' }]}
  />);
  expect(toJson(bidSequenceBlock2)).toMatchSnapshot();

  const bidSequenceBlock3 = shallow(<BidSequenceBlock
    dealer="WEST"
    bidSeq={[
      { level: 6, suit: 'CLUBS' },
      { level: null, suit: 'DOUBLE' },
      { level: null, suit: 'REDOUBLE' },
      { level: null, suit: 'PASS' },
      { level: null, suit: 'PASS' },
      { level: null, suit: 'PASS' }]}
  />);
  expect(toJson(bidSequenceBlock3)).toMatchSnapshot();
});

it('BidSequenceDisplay render', () => {
  const bidSequenceDisplay1 = shallow(<BidSequenceDisplay
    dealer="NORTH"
    vulnerability="EW"
    bidSeq={[]}
  />);
  expect(toJson(bidSequenceDisplay1)).toMatchSnapshot();
});
