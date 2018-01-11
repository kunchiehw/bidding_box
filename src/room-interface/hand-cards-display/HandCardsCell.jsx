import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Segment, Divider } from 'semantic-ui-react';
import { suitCharacter, suitColor } from '../helper-RoomInterface';
import { SEATS_EW, PARTICIPANTS_ROLE } from '../../util/util';

const propTypes = {
  seat: PropTypes.oneOf(SEATS_EW).isRequired,
  playerRole: PropTypes.oneOf(PARTICIPANTS_ROLE).isRequired,
  playerID: PropTypes.string.isRequired,
  playerHand: PropTypes.shape({
    SPADES: PropTypes.string.isRequired,
    HEARTS: PropTypes.string.isRequired,
    DIAMONDS: PropTypes.string.isRequired,
    CLUBS: PropTypes.string.isRequired,
  }),
  playerTurn: PropTypes.bool.isRequired,
  bidSeqIsEnded: PropTypes.bool.isRequired,
};

const defaultProps = {
  playerHand: null,
};

class HandCardsCell extends PureComponent {
  render() {
    let lowerCellContent;

    if (!this.props.playerID) {
      lowerCellContent = null;
    } else if (!this.props.playerHand) {
      lowerCellContent = (
        <div className="card-cell-content">
          Table host is chooing boards.
        </div>);
    } else if (this.props.bidSeqIsEnded
      || this.props.playerRole === 'OBSERVER'
      || this.props.playerRole === this.props.seat) {
      lowerCellContent = (
        <div className="card-cell-content">
          <div>
            <span style={{ color: suitColor('SPADES') }}> {suitCharacter('SPADES')} </span>
            <span> {this.props.playerHand.SPADES} </span>
          </div>
          <div>
            <span style={{ color: suitColor('HEARTS') }}> {suitCharacter('HEARTS')} </span>
            <span> {this.props.playerHand.HEARTS} </span>
          </div>
          <div>
            <span style={{ color: suitColor('DIAMONDS') }}> {suitCharacter('DIAMONDS')} </span>
            <span> {this.props.playerHand.DIAMONDS} </span>
          </div>
          <div>
            <span style={{ color: suitColor('CLUBS') }}> {suitCharacter('CLUBS')} </span>
            <span> {this.props.playerHand.CLUBS} </span>
          </div>
        </div>
      );
    } else if (this.props.playerTurn) {
      lowerCellContent = (
        <div className="card-cell-content">
          It is your turn.
        </div>);
    } else {
      lowerCellContent = (
        <div className="card-cell-content">
          Partner is thinking.
        </div>);
    }

    return (
      <Segment className="hand-cards-display-cell">
        <div className="id-cell">
          {(this.props.playerID) ? `${this.props.seat} : ${this.props.playerID}` : 'Waiting for your partner'}
        </div>
        <Divider />
        <div className="card-cell">
          {lowerCellContent}
        </div>
      </Segment>
    );
  }
}

HandCardsCell.propTypes = propTypes;
HandCardsCell.defaultProps = defaultProps;

export default HandCardsCell;
