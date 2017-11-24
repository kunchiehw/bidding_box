import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BiddingPanel from './bidding_panel/BiddingPanel.jsx';
import {SEATS, VULS} from './util/Util.jsx';

const propTypes = {
  seat: PropTypes.oneOf(SEATS),
  vul: PropTypes.oneOf(VULS),
  dealer: PropTypes.oneOf(SEATS)
};

const defaultProps = {
  seat: 'NORTH',
  vul: 'NONE',
  dealer: 'NORTH'
};

class RoomPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bidSeq: []
    };
    this.handleBidButtonClick = this.handleBidButtonClick.bind(this);
  }

  handleBidButtonClick(bid) {
    let bidSeq = this.state.bidSeq.slice()
    bidSeq.push(bid)
    this.setState({
      bidSeq: bidSeq
    });
    console.log(bidSeq);
  }

  render() {

    const testProp = {
      curBid: null,
      disabledDouble: true,
      disabledRedouble: true,
      handleClick: this.handleBidButtonClick
    };

    return (
      <div className="room-page">
        <BiddingPanel {...testProp}/>
      </div>
    );
  }
}

RoomPage.propTypes = propTypes;
RoomPage.defaultProps = defaultProps;

export default RoomPage;
