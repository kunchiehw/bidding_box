import React from 'react';
import PropTypes from 'prop-types';
import './DisplayPanel.css';
import SeatRow from './SeatRow.jsx';
import DisplayBidPanel from './DisplayBidPanel.jsx';
import {SEATS, VULS, SUITS, NON_SUITS} from '../util/Util.jsx';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  vulnerability: PropTypes.oneOf(VULS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(SUITS.concat(NON_SUITS)).isRequired
  }))
};

function DisplayPanel(props) {
  return (
    <div>
      <SeatRow vulnerability={props.vulnerability}/>
      <DisplayBidPanel dealer={props.dealer} bidSeq={props.bidSeq}/>
    </div>
  );
}

DisplayPanel.propTypes = propTypes;

export default DisplayPanel;
