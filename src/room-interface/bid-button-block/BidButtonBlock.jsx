import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './BidButtonBlock.css';
// import BidButton from './BidButton';
import BidButton from '../../components/BidButton';
import { shouldStandardBidButtonDisabled } from './helper-BidButtonBlock';
import { POSSIBLE_LEVELS, STANDARD_SUITS } from '../../util/util';

const propTypes = {
  currentLevel: PropTypes.number.isRequired,
  currentSuit: PropTypes.oneOf(STANDARD_SUITS.concat(['PASS'])).isRequired,
  shouldDoubleButtonDisabled: PropTypes.bool.isRequired,
  shouldRedoubleButtonDisabled: PropTypes.bool.isRequired,
  handleBidButtonClick: PropTypes.func.isRequired,
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
          handleBidButtonClick={this.props.handleBidButtonClick}
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
            suit="PASS"
            isDisabled={false}
            handleBidButtonClick={this.props.handleBidButtonClick}
          />
          <BidButton
            level={0}
            suit="DOUBLE"
            isDisabled={this.props.shouldDoubleButtonDisabled}
            handleBidButtonClick={this.props.handleBidButtonClick}
          />
          <BidButton
            level={0}
            suit="REDOUBLE"
            isDisabled={this.props.shouldRedoubleButtonDisabled}
            handleBidButtonClick={this.props.handleBidButtonClick}
          />
        </div>
      </div>
    );
  }
}

BidButtonBlock.propTypes = propTypes;

export default BidButtonBlock;
