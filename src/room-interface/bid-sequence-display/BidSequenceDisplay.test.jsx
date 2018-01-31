import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BidSequenceBlock from './BidSequenceBlock';
import BidSequenceDisplay from './BidSequenceDisplay';
import { SEATS } from '../../util/util';

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
