import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import './HandCardsDisplay.css';
import HandCardsCell from './HandCardsCell';
import { PARTICIPANTS_ROLE } from '../../util/util';

const propTypes = {
  playerRole: PropTypes.oneOf(PARTICIPANTS_ROLE).isRequired,
  // TODO: Make more specific validator
  eastHand: PropTypes.shape({
    SPADES: PropTypes.string.isRequired,
    HEARTS: PropTypes.string.isRequired,
    DIAMONDS: PropTypes.string.isRequired,
    CLUBS: PropTypes.string.isRequired,
  }),
  westHand: PropTypes.shape({
    SPADES: PropTypes.string.isRequired,
    HEARTS: PropTypes.string.isRequired,
    DIAMONDS: PropTypes.string.isRequired,
    CLUBS: PropTypes.string.isRequired,
  }),
  eastID: PropTypes.string.isRequired,
  westID: PropTypes.string.isRequired,
  whoseTurn: PropTypes.oneOf(PARTICIPANTS_ROLE),
  bidSeqIsEnded: PropTypes.bool.isRequired,
};

const defaultProps = {
  eastHand: null,
  westHand: null,
  whoseTurn: null,
};

class HandCardsDisplay extends PureComponent {
  render() {
    return (
      <Grid className="hand-cards-display-block" columns="equal">
        <Grid.Column>
          <HandCardsCell
            seat="WEST"
            playerRole={this.props.playerRole}
            playerID={this.props.westID}
            playerHand={this.props.westHand}
            playerTurn={this.props.whoseTurn === 'WEST'}
            bidSeqIsEnded={this.props.bidSeqIsEnded}
          />
        </Grid.Column>
        <Grid.Column>
          <HandCardsCell
            seat="EAST"
            playerRole={this.props.playerRole}
            playerID={this.props.eastID}
            playerHand={this.props.eastHand}
            playerTurn={this.props.whoseTurn === 'EAST'}
            bidSeqIsEnded={this.props.bidSeqIsEnded}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

HandCardsDisplay.propTypes = propTypes;
HandCardsDisplay.defaultProps = defaultProps;

export default HandCardsDisplay;
