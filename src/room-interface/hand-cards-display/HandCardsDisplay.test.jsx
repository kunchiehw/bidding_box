import React from 'react';
import { shallow } from 'enzyme';
import HandCardsDisplay from './HandCardsDisplay';

it('HandCardsDisplay render', () => {
  const prop1 = {
    role: 'EAST',
    eastHand: ['AKQ', '', 'AKQ', 'AKQJT98'],
    westHand: ['5432', '432', '432', '432'],
    eastID: 'jarron',
    westID: 'wkc',
    endBidSequence: false,
  };
  shallow(<HandCardsDisplay {...prop1} />);

  const prop2 = {
    role: 'WEST',
    eastHand: ['J', '', 'AKQJT9876543', ''],
    westHand: ['T987', 'T98765432', '', ''],
    eastID: 'jerry',
    westID: 'jason',
    endBidSequence: true,
  };
  shallow(<HandCardsDisplay {...prop2} />);

  const prop3 = {
    role: 'OBSERVER',
    eastHand: ['AKQJT9876532', '', '', ''],
    westHand: ['', 'AKQJT9876532', '', ''],
    eastID: 'Shih',
    westID: 'Wang',
    endBidSequence: false,
  };
  shallow(<HandCardsDisplay {...prop3} />);
});
