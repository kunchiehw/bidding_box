import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import HandCardsCell from './HandCardsCell';
import { PARTICIPANTS } from '../utils/constants';

const propTypes = {
  playerRole: PropTypes.oneOf(PARTICIPANTS).isRequired,
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
  eastId: PropTypes.string,
  westId: PropTypes.string,
  bidSeqIsEnded: PropTypes.bool.isRequired,
  handleClickToSit: PropTypes.func.isRequired,
};

const defaultProps = {
  eastHand: null,
  westHand: null,
  eastId: null,
  westId: null,
};

class HandCardsBlock extends PureComponent {
  render() {
    return (
      <Grid className="hand-cards-display-block" columns="equal">
        <Grid.Column>
          <HandCardsCell
            seat="WEST"
            playerRole={this.props.playerRole}
            playerId={this.props.westId}
            playerHand={this.props.westHand}
            bidSeqIsEnded={this.props.bidSeqIsEnded}
            handleClickToSit={this.props.handleClickToSit}
          />
        </Grid.Column>
        <Grid.Column>
          <HandCardsCell
            seat="EAST"
            playerRole={this.props.playerRole}
            playerId={this.props.eastId}
            playerHand={this.props.eastHand}
            bidSeqIsEnded={this.props.bidSeqIsEnded}
            handleClickToSit={this.props.handleClickToSit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

HandCardsBlock.propTypes = propTypes;
HandCardsBlock.defaultProps = defaultProps;

export default HandCardsBlock;
