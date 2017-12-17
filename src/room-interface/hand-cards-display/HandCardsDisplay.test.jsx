import React from 'react';
import { shallow } from 'enzyme';
import HandCardsDisplay from './HandCardsDisplay';

it('HandCardsDisplay render', () => {
  const prop = {
    role: 'OBSERVER',
    eastHand: ['AKQ', '', 'AKQ', 'AKQJT98'],
    westHand: ['5432', '432', '432', '432'],
    eastID: 'jarron',
    westID: 'wkc',
    endBidSequence: false,
  };
  shallow(<HandCardsDisplay {...prop} />);
});
