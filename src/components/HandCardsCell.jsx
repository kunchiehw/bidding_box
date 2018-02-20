import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Segment, Divider, Button } from 'semantic-ui-react';
import getMessage from '../i18n/messages';
import { EW_SEATS, PARTICIPANTS } from '../utils/constants';
import { suitColor } from '../utils/helpers';


const propTypes = {
  seat: PropTypes.oneOf(EW_SEATS).isRequired,
  playerRole: PropTypes.oneOf(PARTICIPANTS).isRequired,
  playerId: PropTypes.string,
  playerHand: PropTypes.shape({
    SPADES: PropTypes.string.isRequired,
    HEARTS: PropTypes.string.isRequired,
    DIAMONDS: PropTypes.string.isRequired,
    CLUBS: PropTypes.string.isRequired,
  }),
  bidSeqIsEnded: PropTypes.bool.isRequired,
  handleClickToSit: PropTypes.func.isRequired,
};

const defaultProps = {
  playerHand: null,
  playerId: null,
};

class HandCardsCell extends PureComponent {
  render() {
    const idCell = (this.props.playerId) ? (
      <div className="id-cell">
        {this.props.playerId}
      </div>
    ) : (
      <Button onClick={() => this.props.handleClickToSit(this.props.seat)}>
        {`Click to sit ${this.props.seat}`}
      </Button>
    );

    const cardCell = ((this.props.playerHand) &&
    (this.props.bidSeqIsEnded || this.props.playerRole === 'OBSERVER' || this.props.playerRole === this.props.seat)) ? (
      <div className="card-cell">
        <div className="card-cell-content">
          <div>
            <span style={{ color: suitColor('SPADES') }}> {getMessage('SPADES')} </span>
            <span> {this.props.playerHand.SPADES} </span>
          </div>
          <div>
            <span style={{ color: suitColor('HEARTS') }}> {getMessage('HEARTS')} </span>
            <span> {this.props.playerHand.HEARTS} </span>
          </div>
          <div>
            <span style={{ color: suitColor('DIAMONDS') }}> {getMessage('DIAMONDS')} </span>
            <span> {this.props.playerHand.DIAMONDS} </span>
          </div>
          <div>
            <span style={{ color: suitColor('CLUBS') }}> {getMessage('CLUBS')} </span>
            <span> {this.props.playerHand.CLUBS} </span>
          </div>
        </div>
      </div>
      ) : (
        <div className="card-cell" />
      );

    return (
      <Segment className="hand-cards-display-cell">
        {idCell}
        <Divider />
        {cardCell}
      </Segment>
    );
  }
}

HandCardsCell.propTypes = propTypes;
HandCardsCell.defaultProps = defaultProps;

export default HandCardsCell;
