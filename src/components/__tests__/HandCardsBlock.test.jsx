import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HandCardsBlock from '../HandCardsBlock';
import { PARTICIPANTS, BOOLEANS } from '../../utils/constants';

describe('HandCardsDisplay render', () => {
  const hands = [
    {
      eastHand: null,
      westHand: null,
    },
    {
      eastHand: {
        SPADES: 'AT4', HEARTS: 'K97', DIAMONDS: 'Q875', CLUBS: 'KJT',
      },
      westHand: {
        SPADES: 'QJ632', HEARTS: 'AT653', DIAMONDS: 'K9', CLUBS: '2',
      },
    },
  ];
  const ids = [
    {
      eastId: 'jarron',
      westId: 'wkc',
    },
    {
      eastId: 'lonely',
      westId: '',
    },
  ];

  PARTICIPANTS.forEach((playerRole) => {
    ids.forEach((playerIds) => {
      hands.forEach((playerHands) => {
        BOOLEANS.forEach((bidSeqIsEnded) => {
          it(`playerRole: ${playerRole}, playerIds: ${playerIds},
              playerHands: ${playerHands}, bidSeqIsEnded: ${bidSeqIsEnded}`, () => {
            const handCardsDisplay = shallow(<HandCardsBlock
              playerRole={playerRole}
              eastHand={playerHands.eastHand}
              westHand={playerHands.westHand}
              eastId={playerIds.eastId}
              westId={playerIds.westId}
              bidSeqIsEnded={bidSeqIsEnded}
              handleClickToSit={() => {}}
            />);
            expect(toJson(handCardsDisplay)).toMatchSnapshot();
          });
        });
      });
    });
  });
});
