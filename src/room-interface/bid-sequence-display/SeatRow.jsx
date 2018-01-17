import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { SEATS, SEATS_NS, SEATS_EW, VULS } from '../../util/util';

function isVulnerable(seat, vulnerability) {
  if (vulnerability === 'BOTH') return true;
  if (vulnerability === 'NS' && SEATS_NS.includes(seat)) return true;
  if (vulnerability === 'EW' && SEATS_EW.includes(seat)) return true;
  return false;
}

const propTypes = {
  vulnerability: PropTypes.oneOf(VULS).isRequired,
};

class SeatRow extends PureComponent {
  render() {
    return (
      <div className="seat-row">
        {SEATS.map((seat) => {
          const seatIsVulnerable = isVulnerable(seat, this.props.vulnerability);
          return ((seatIsVulnerable) ?
            <Segment key={seat} className="seat-cell" color="red" inverted> {seat} </Segment>
          : <Segment key={seat} className="seat-cell"> {seat} </Segment>
          );
        })}
      </div>
    );
  }
}

SeatRow.propTypes = propTypes;

export default SeatRow;
