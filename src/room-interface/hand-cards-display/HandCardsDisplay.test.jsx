import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HandCardsCell from './HandCardsCell';
import HandCardsDisplay from './HandCardsDisplay';
import { SEATS_EW, PARTICIPANTS_ROLE, BOOLEAN_CHOICES } from '../../util/util';

describe('HandCardsCell render', () => {
  const ids = ['', 'testId'];
  const hands = [
    null,
    {
      SPADES: 'AKQ', HEARTS: 'AKQJT98', DIAMONDS: '432', CLUBS: '',
    },
  ];

  SEATS_EW.forEach((seat) => {
    PARTICIPANTS_ROLE.forEach((playerRole) => {
      ids.forEach((playerId) => {
        hands.forEach((playerHand) => {
          BOOLEAN_CHOICES.forEach((bidSeqIsEnded) => {
            it(`seat: ${seat}, playerRole: ${playerRole}, playerId: ${playerId},
              playerHand: ${playerHand}, bidSeqIsEnded: ${bidSeqIsEnded}`, () => {
              const handCardsCell = shallow(<HandCardsCell
                seat={seat}
                playerRole={playerRole}
                playerId={playerId}
                playerHand={playerHand}
                bidSeqIsEnded={bidSeqIsEnded}
              />);
              expect(toJson(handCardsCell)).toMatchSnapshot();
            });
          });
        });
      });
    });
  });
});

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

  PARTICIPANTS_ROLE.forEach((playerRole) => {
    ids.forEach((playerIds) => {
      hands.forEach((playerHands) => {
        BOOLEAN_CHOICES.forEach((bidSeqIsEnded) => {
          it(`playerRole: ${playerRole}, playerIds: ${playerIds},
              playerHands: ${playerHands}, bidSeqIsEnded: ${bidSeqIsEnded}`, () => {
            const handCardsDisplay = shallow(<HandCardsDisplay
              playerRole={playerRole}
              eastHand={playerHands.eastHand}
              westHand={playerHands.westHand}
              eastId={playerIds.eastId}
              westId={playerIds.westId}
              bidSeqIsEnded={bidSeqIsEnded}
            />);
            expect(toJson(handCardsDisplay)).toMatchSnapshot();
          });
        });
      });
    });
  });
});
