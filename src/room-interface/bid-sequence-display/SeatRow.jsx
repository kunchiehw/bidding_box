import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
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
      <Segment
        key={seat}
        className="bid-sequence-display-cell seat-cell"
        size="small"
        color="red"
        inverted
      >
        {seat}
      </Segment>
    );
  }

  return (
    <Segment
      key={seat}
      className="bid-sequence-display-cell seat-cell"
      size="small"
    >
      {seat}
    </Segment>
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
