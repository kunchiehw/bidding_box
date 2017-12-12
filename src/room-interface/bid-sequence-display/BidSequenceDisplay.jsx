import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import './BidSequenceDisplay.css';
import SeatRow from './SeatRow';
import BidBlock from './BidBlock';
import { SEATS, VULS, SUITS, NON_SUITS } from '../../util/util';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  vulnerability: PropTypes.oneOf(VULS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(SUITS.concat(NON_SUITS)).isRequired,
  })).isRequired,
};

function BidSequenceDisplay(props) {
  return (
    <div className="bid-sequence-display">
      <SeatRow vulnerability={props.vulnerability} />
      <Divider />
      <BidBlock dealer={props.dealer} bidSeq={props.bidSeq} />
    </div>
  );
}

BidSequenceDisplay.propTypes = propTypes;

export default BidSequenceDisplay;
