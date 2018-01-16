import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BidButton from './BidButton';
import BidButtonBlock from './BidButtonBlock';
import { shouldStandardBidButtonDisabled } from './helper-BidButtonBlock';

it('helper shouldStandardBidButtonDisabled', () => {
  expect(shouldStandardBidButtonDisabled(0, 'PASS', 1, 'CLUBS')).toEqual(false);
  expect(shouldStandardBidButtonDisabled(2, 'SPADES', 2, 'NOTRUMPS')).toEqual(false);
  expect(shouldStandardBidButtonDisabled(2, 'NOTRUMPS', 3, 'SPADES')).toEqual(false);
  expect(shouldStandardBidButtonDisabled(4, 'HEARTS', 4, 'DIAMONDS')).toEqual(true);
  expect(shouldStandardBidButtonDisabled(5, 'DIAMONDS', 4, 'HEARTS')).toEqual(true);
});

it('BidButton render', () => {
  const bidButton1 = shallow(<BidButton
    level={0}
    suit="PASS"
    isDisabled={false}
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton1)).toMatchSnapshot();

  const bidButton2 = shallow(<BidButton
    level={0}
    suit="DOUBLE"
    isDisabled
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton2)).toMatchSnapshot();

  const bidButton3 = shallow(<BidButton
    level={0}
    suit="REDOUBLE"
    isDisabled={false}
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton3)).toMatchSnapshot();

  const bidButton4 = shallow(<BidButton
    level={1}
    suit="CLUBS"
    isDisabled
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton4)).toMatchSnapshot();

  const bidButton5 = shallow(<BidButton
    level={2}
    suit="DIAMONDS"
    isDisabled={false}
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton5)).toMatchSnapshot();

  const bidButton6 = shallow(<BidButton
    level={3}
    suit="HEARTS"
    isDisabled
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton6)).toMatchSnapshot();

  const bidButton7 = shallow(<BidButton
    level={5}
    suit="SPADES"
    isDisabled={false}
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton7)).toMatchSnapshot();

  const bidButton8 = shallow(<BidButton
    level={7}
    suit="NOTRUMPS"
    isDisabled
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButton8)).toMatchSnapshot();
});

it('BidButtonBlock render', () => {
  const bidButtonBlock1 = shallow(<BidButtonBlock
    currentLevel={0}
    currentSuit="PASS"
    shouldDoubleButtonDisabled
    shouldRedoubleButtonDisabled
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButtonBlock1)).toMatchSnapshot();

  const bidButtonBlock2 = shallow(<BidButtonBlock
    currentLevel={3}
    currentSuit="NOTRUMPS"
    shouldDoubleButtonDisabled={false}
    shouldRedoubleButtonDisabled
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButtonBlock2)).toMatchSnapshot();

  const bidButtonBlock3 = shallow(<BidButtonBlock
    currentLevel={7}
    currentSuit="HEARTS"
    shouldDoubleButtonDisabled
    shouldRedoubleButtonDisabled={false}
    handleBidButtonClick={() => null}
  />);
  expect(toJson(bidButtonBlock3)).toMatchSnapshot();
});
