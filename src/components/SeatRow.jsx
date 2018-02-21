import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { SEATS, VULNERABILITIES } from '../utils/constants';
import { isVulnerable } from '../utils/helpers';

const propTypes = {
  vulnerability: PropTypes.oneOf(VULNERABILITIES).isRequired,
};

class SeatRow extends PureComponent {
  render() {
    return (
      <Grid.Row key="seat" className="seat-row" column={4}>
        {SEATS.map((seat) => {
          const seatIsVulnerable = isVulnerable(seat, this.props.vulnerability);
          return ((
            <Grid.Column key={seat}>
              <Segment
                className="seat-cell"
                color={(seatIsVulnerable) ? 'red' : null}
                inverted={seatIsVulnerable}
              >
                {seat}
              </Segment>
            </Grid.Column>
          ));
        })}
      </Grid.Row>
    );
  }
}

SeatRow.propTypes = propTypes;

export default SeatRow;
