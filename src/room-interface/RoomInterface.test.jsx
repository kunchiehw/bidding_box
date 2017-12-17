import React from 'react';
import { shallow } from 'enzyme';
import RoomInterface from './RoomInterface';

it('RoomInterface render', () => {
  const prop1 = {
    role: 'EAST',
    vulnerability: 'EW',
    dealer: 'WEST',
    eastHand: ['', '', '', 'AKQJT98765432'],
    westHand: ['', '', 'AKQJT98765432', ''],
    eastID: 'jarron',
    westID: 'wkc',
    scoreList: [],
    roomName: 'UNIT_TEST',
  };
  shallow(<RoomInterface {...prop1} />);
});
