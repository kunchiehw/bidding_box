import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { bidToString, suitColor } from '../utils/helper';
import { levelValidator } from '../utils/validators';
import { ALL_SUITS } from '../utils/constants';

const propTypes = {
  level: levelValidator.isRequired,
  suit: PropTypes.oneOf(ALL_SUITS).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleBidButtonClick: PropTypes.func.isRequired,
};

class BidButton extends PureComponent {
  render() {
    return (
      <Button
        className="bid-button"
        onClick={() => { this.props.handleBidButtonClick(this.props.level, this.props.suit); }}
        disabled={this.props.isDisabled}
        color={suitColor(this.props.suit)}
        size="small"
      >
        {bidToString(this.props.level, this.props.suit)}
      </Button>
    );
  }
}

BidButton.propTypes = propTypes;

export default BidButton;
