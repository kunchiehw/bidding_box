import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import BidButton from './BidButton';
import { POSSIBLE_LEVELS, STANDARD_SUITS } from '../utils/constants';
import { isStandardBidAllowed } from '../utils/bidHelpers';
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
        <Grid.Column key={buttonSuit}>
          <BidButton
            level={buttonLevel}
            suit={buttonSuit}
            isDisabled={!isStandardBidAllowed(buttonLevel, buttonSuit, this.props.level, this.props.suit)}
            handleBidButtonClick={this.props.handleBidButtonClick}
          />
        </Grid.Column>
      ));
      return (
        <Grid.Row
          key={buttonLevel}
          className="bid-button-row standard-suit-bid-button-row"
          column={5}
        >
          {standardSuitsButtons}
        </Grid.Row>
      );
    });

    const specialSuitsRow = (
      <Grid.Row
        key={0}
        className="bid-button-row special-bid-button-row"
        column={3}
      >
        <Grid.Column key="PASS">
          <BidButton
            level={0}
            suit="PASS"
            isDisabled={false}
            handleBidButtonClick={this.props.handleBidButtonClick}
          />
        </Grid.Column>
        <Grid.Column key="DOUBLE">
          <BidButton
            level={0}
            suit="DOUBLE"
            isDisabled={this.props.shouldDoubleButtonDisabled}
            handleBidButtonClick={this.props.handleBidButtonClick}
          />
        </Grid.Column>
        <Grid.Column key="REDOUBLE">
          <BidButton
            level={0}
            suit="REDOUBLE"
            isDisabled={this.props.shouldRedoubleButtonDisabled}
            handleBidButtonClick={this.props.handleBidButtonClick}
          />
        </Grid.Column>
      </Grid.Row>
    );

    return (
      <Grid className="bid-button-block">
        {standardSuitsRows}
        {specialSuitsRow}
      </Grid>
    );
  }
}

BidButtonBlock.propTypes = propTypes;

export default BidButtonBlock;
