import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SeatRow from './SeatRow';
import BidSequenceBlock from './BidSequenceBlock';
import BidSequenceDisplay from './BidSequenceDisplay';
import { SEATS, VULS } from '../../util/util';

describe('SeatRow render', () => {
  VULS.forEach((vul) => {
    it(`vulnerability: ${vul}`, () => {
      const seatRow = shallow(<SeatRow
        vulnerability={vul}
      />);
      expect(toJson(seatRow)).toMatchSnapshot();
    });
  });
});

describe('BidSequenceBlock render', () => {
  const bidSeqs = [
    [],
    [
      { level: 1, suit: 'CLUBS' },
      { level: 2, suit: 'DIAMONDS' },
      { level: 3, suit: 'HEARTS' },
      { level: 4, suit: 'SPADES' },
      { level: 5, suit: 'NOTRUMPS' },
    ],
    [
      { level: 6, suit: 'CLUBS' },
      { level: 0, suit: 'DOUBLE' },
      { level: 0, suit: 'REDOUBLE' },
      { level: 0, suit: 'PASS' },
      { level: 0, suit: 'PASS' },
      { level: 0, suit: 'PASS' },
    ],
  ];

  SEATS.forEach((seat) => {
    bidSeqs.forEach((bidSeq) => {
      it(`seat: ${seat}, bidSeq: ${bidSeq}`, () => {
        const bidSequenceBlock = shallow(<BidSequenceBlock
          dealer={seat}
          bidSeq={bidSeq}
        />);
        expect(toJson(bidSequenceBlock)).toMatchSnapshot();
      });
    });
  });
});

describe('BidSequenceDisplay render', () => {
  it('basic case', () => {
    const bidSequenceDisplay1 = shallow(<BidSequenceDisplay
      dealer="NORTH"
      vulnerability="EW"
      bidSeq={[]}
    />);
    expect(toJson(bidSequenceDisplay1)).toMatchSnapshot();
  });
});
