import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './BidButtonBlock.css';
import BidButton from './BidButton';
import { shouldStandardBidButtonDisabled } from './helper-BidButtonBlock';
import { STANDARD_SUITS, SPECIAL_SUITS } from '../../util/util';

const POSSIBLE_LEVELS = [1, 2, 3, 4, 5, 6, 7];

const propTypes = {
  currentLevel: PropTypes.number.isRequired,
  currentSuit: PropTypes.oneOf(STANDARD_SUITS.concat(['PASS'])).isRequired,
  disabledDouble: PropTypes.bool.isRequired,
  disabledRedouble: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

class BidButtonBlock extends PureComponent {
  render() {
    const standardSuitsPanel = POSSIBLE_LEVELS.map((level) => {
      const standardSuitsButtons = STANDARD_SUITS.map(suit => (
        <BidButton
          key={suit}
          level={level}
          suit={suit}
          isDisabled={shouldStandardBidButtonDisabled(this.props.currentLevel, this.props.currentSuit, level, suit)}
          handleClick={this.props.handleClick}
        />
      ));
      return (
        <div key={level} className="bid-button-row standard-suit-bid-button-row">{standardSuitsButtons}</div>
      );
    });

    return (
      <div className="bid-button-block">
        {standardSuitsPanel}
        <div className="bid-button-row special-bid-button-row">
          <BidButton
            level={0}
            suit={SPECIAL_SUITS[0]}
            isDisabled={false}
            handleClick={this.props.handleClick}
          />
          <BidButton
            level={0}
            suit={SPECIAL_SUITS[1]}
            isDisabled={this.props.disabledDouble}
            handleClick={this.props.handleClick}
          />
          <BidButton
            level={0}
            suit={SPECIAL_SUITS[2]}
            isDisabled={this.props.disabledRedouble}
            handleClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}

BidButtonBlock.propTypes = propTypes;

export default BidButtonBlock;
