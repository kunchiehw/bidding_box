import React from 'react';
import { shallow } from 'enzyme';
import RoomInterface from './RoomInterface';

it('renders without crashing', () => {
  const testProp = {
    role: 'EAST',
    vulnerability: 'NONE',
    dealer: 'NORTH',
    eastHand: ['AKQJT98765432', '', '', ''],
    westHand: ['', 'AKQJT98765432', '', ''],
    eastID: 'Jarron',
    westID: 'wkc',
    scoreList: [],
  };

  shallow(<RoomInterface {...testProp} />);
});
