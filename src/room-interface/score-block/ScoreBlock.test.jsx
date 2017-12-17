import React from 'react';
import { shallow } from 'enzyme';
import ScoreBlock from './ScoreBlock';

it('ScoreBlock render', () => {
  const prop1 = {
    scoreList: [],
  };
  shallow(<ScoreBlock {...prop1} />);

  const prop2 = {
    scoreList: [
      { bid: { level: 1, suit: 'CLUBS' }, declarer: 'NORTH', score: 100 },
      { bid: { level: 2, suit: 'DIAMONDS' }, declarer: 'SOUTH', score: 85 },
      { bid: { level: 3, suit: 'HEARTS' }, declarer: 'EAST', score: 70 },
      { bid: { level: 4, suit: 'SPADES' }, declarer: 'WEST', score: 55 },
      { bid: { level: 5, suit: 'NOTRUMPS' }, declarer: 'NS', score: 40 },
      { bid: { level: 6, suit: 'NOTRUMPS' }, declarer: 'EW', score: 25 },
    ],
  };
  shallow(<ScoreBlock {...prop2} />);
});
