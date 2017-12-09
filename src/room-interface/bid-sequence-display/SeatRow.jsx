import React from 'react';
import PropTypes from 'prop-types';
import { SEATS, SEATS_NS, SEATS_EW, VULS } from '../../util/util';

const propTypes = {
  vulnerability: PropTypes.oneOf(VULS).isRequired,
};

function SeatCell(seat, vulnerability) {
  const vulnerable = (vulnerability === 'BOTH')
    || (vulnerability === 'NS' && SEATS_NS.includes(seat))
    || (vulnerability === 'EW' && SEATS_EW.includes(seat));

  if (vulnerable) {
    return (
      <div key={seat} className="bid-sequence-display-cell seat-cell vulnerable-seat-cell">{seat}</div>
    );
  }

  return (
    <div key={seat} className="bid-sequence-display-cell seat-cell non-vulnerable-seat-cell">{seat}</div>
  );
}

function SeatRow(props) {
  const SeatCells = [];
  for (let seatIndex = 0; seatIndex < SEATS.length; seatIndex += 1) {
    SeatCells.push(SeatCell(SEATS[seatIndex], props.vulnerability));
  }
  return (
    <div className="seat-row">
      {SeatCells}
    </div>
  );
}

SeatRow.propTypes = propTypes;

export default SeatRow;
