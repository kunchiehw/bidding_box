import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';
import SeatRow from './SeatRow';
import BidSequenceRows from './BidSequenceRows';
import { SEATS, VULNERABILITIES, ALL_SUITS } from '../utils/constants';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  vulnerability: PropTypes.oneOf(VULNERABILITIES).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(ALL_SUITS).isRequired,
  })).isRequired,
};

function BidSequenceBlock(props) {
  return (
    <Grid className="bid-sequence-block">
      <SeatRow vulnerability={props.vulnerability} />
      <Divider />
      <BidSequenceRows dealer={props.dealer} bidSeq={props.bidSeq} />
    </Grid>
  );
}

BidSequenceBlock.propTypes = propTypes;

export default BidSequenceBlock;
