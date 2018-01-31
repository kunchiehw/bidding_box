import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import './BidSequenceDisplay.css';
import SeatRow from '../../components/SeatRow';
import BidSequenceBlock from './BidSequenceBlock';
import { SEATS, VULS, ALL_SUITS } from '../../util/util';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  vulnerability: PropTypes.oneOf(VULS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(ALL_SUITS).isRequired,
  })).isRequired,
};

function BidSequenceDisplay(props) {
  return (
    <div className="bid-sequence-display">
      <SeatRow vulnerability={props.vulnerability} />
      <Divider />
      <BidSequenceBlock dealer={props.dealer} bidSeq={props.bidSeq} />
    </div>
  );
}

BidSequenceDisplay.propTypes = propTypes;

export default BidSequenceDisplay;
