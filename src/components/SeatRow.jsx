import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { SEATS, VULNERABILITIES } from '../utils/constants';
import { isVulnerable } from '../utils/helpers';

const propTypes = {
  vulnerability: PropTypes.oneOf(VULNERABILITIES).isRequired,
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
