import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HandCardsCell from '../HandCardsCell';
import { EW_SEATS, PARTICIPANTS, BOOLEANS } from '../../utils/constants';

describe('HandCardsCell render', () => {
  const ids = ['', 'testId'];
  const hands = [
    null,
    {
      SPADES: 'AKQ', HEARTS: 'AKQJT98', DIAMONDS: '432', CLUBS: '',
    },
  ];

  EW_SEATS.forEach((seat) => {
    PARTICIPANTS.forEach((playerRole) => {
      ids.forEach((playerId) => {
        hands.forEach((playerHand) => {
          BOOLEANS.forEach((bidSeqIsEnded) => {
            it(`seat: ${seat}, playerRole: ${playerRole}, playerId: ${playerId},
              playerHand: ${playerHand}, bidSeqIsEnded: ${bidSeqIsEnded}`, () => {
              const handCardsCell = shallow(<HandCardsCell
                seat={seat}
                playerRole={playerRole}
                playerId={playerId}
                playerHand={playerHand}
                bidSeqIsEnded={bidSeqIsEnded}
                handleClickToSit={() => {}}
              />);
              expect(toJson(handCardsCell)).toMatchSnapshot();
            });
          });
        });
      });
    });
  });
});
