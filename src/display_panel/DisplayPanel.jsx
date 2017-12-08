import React from 'react';
import PropTypes from 'prop-types';
import './DisplayPanel.css';
import SeatRow from './SeatRow.jsx';
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
    <SeatRow vulnerability={props.vulnerability}/>
  );
}

DisplayPanel.propTypes = propTypes;

export default DisplayPanel;
