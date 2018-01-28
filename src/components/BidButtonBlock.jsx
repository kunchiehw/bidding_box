import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import BidButton from './BidButton';
import { POSSIBLE_LEVELS, STANDARD_SUITS } from '../utils/constants';
import { shouldStandardBidButtonDisabled } from '../utils/helpers';
import { levelValidator } from '../utils/validators';

const propTypes = {
  level: levelValidator.isRequired,
  suit: PropTypes.oneOf(STANDARD_SUITS.concat(['PASS'])).isRequired,
  shouldDoubleButtonDisabled: PropTypes.bool.isRequired,
  shouldRedoubleButtonDisabled: PropTypes.bool.isRequired,
  handleBidButtonClick: PropTypes.func.isRequired,
};

class BidButtonBlock extends PureComponent {
  render() {
    const standardSuitsRows = POSSIBLE_LEVELS.map((buttonLevel) => {
      const standardSuitsButtons = STANDARD_SUITS.map(buttonSuit => (
        <BidButton
          key={buttonSuit}
          level={buttonLevel}
          suit={buttonSuit}
          isDisabled={shouldStandardBidButtonDisabled(this.props.level, this.props.suit, buttonLevel, buttonSuit)}
          handleBidButtonClick={this.props.handleBidButtonClick}
        />
      ));
      return (
        <Container
          key={buttonLevel}
          className="bid-button-row standard-suit-bid-button-row"
        >
          {standardSuitsButtons}
        </Container>
      );
    });

    const specialSuitsRow = (
      <Container className="bid-button-row special-bid-button-row">
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
      </Container>
    );

    return (
      <Container className="bid-button-block">
        {standardSuitsRows}
        {specialSuitsRow}
      </Container>
    );
  }
}

BidButtonBlock.propTypes = propTypes;

export default BidButtonBlock;
