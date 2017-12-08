import React from 'react';
import PropTypes from 'prop-types';
import {VULS} from '../util/Util.jsx';

const propTypes = {
  vulnerability: PropTypes.oneOf(VULS).isRequired
};

function SeatBlock(seat, vulnerability) {
  const vulnerable = (vulnerability === 'BOTH')
    || (vulnerability === 'NS' && (seat === 'NORTH' || seat === 'SOUTH'))
    || (vulnerability === 'EW' && (seat === 'EAST' || seat === 'WEST'))

  if(vulnerable) {
    return (
      <div key={seat} className='display-block seat-block vulnerable-seat-block'>{seat}</div>
    );
  }
  else {
    return (
      <div key={seat} className='display-block seat-block non-vulnerable-seat-block'>{seat}</div>
    );
  }
}

function SeatRow(props) {
  const SeatBlocks = [];
  SeatBlocks.push(SeatBlock('WEST', props.vulnerability));
  SeatBlocks.push(SeatBlock('NORTH', props.vulnerability));
  SeatBlocks.push(SeatBlock('EAST', props.vulnerability));
  SeatBlocks.push(SeatBlock('SOUTH', props.vulnerability));
  return (
    <div>
      {SeatBlocks}
    </div>
  );
}

SeatRow.propTypes = propTypes;

export default SeatRow;
