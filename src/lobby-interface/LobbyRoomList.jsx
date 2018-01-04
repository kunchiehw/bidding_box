import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const propTypes = {
  roomList: PropTypes.arrayOf(PropTypes.shape({
    roomName: PropTypes.string.isRequired,
    eastOccupied: PropTypes.bool.isRequired,
    westOccupied: PropTypes.bool.isRequired,
  })),
  handleClick: PropTypes.func.isRequired,
};

const defaultProps = {
  roomList: null,
};

function generateTableCell(roomName, eastOccupied, westOccupied, handleClick) {
  const handleClickEast = () => { handleClick(roomName, 'EAST'); };
  const handleClickWest = () => { handleClick(roomName, 'WEST'); };
  const handleClickObserver = () => { handleClick(roomName, 'OBSERVER'); };
  const handleClickTester = () => { handleClick(roomName, 'TESTER'); };

  return (
    <div key={roomName} className="room-cell">
      {roomName}
      <Button
        className="room-seat-button"
        onClick={handleClickWest}
        disabled={westOccupied}
        size="small"
      >
        West
      </Button>
      <Button
        className="room-seat-button"
        onClick={handleClickEast}
        disabled={eastOccupied}
        size="small"
      >
        East
      </Button>
      <Button
        className="table-seat-button"
        onClick={handleClickObserver}
        size="small"
      >
        OBSERVER
      </Button>
      <Button
        className="table-seat-button"
        onClick={handleClickTester}
        size="small"
      >
        TESTER
      </Button>
    </div>
  );
}

function LobbyRoomList(props) {
  const roomCells = [];

  for (let roomIndex = 0; roomIndex < props.roomList.length; roomIndex += 1) {
    roomCells.push(generateTableCell(
      props.roomList[roomIndex].roomName,
      props.roomList[roomIndex].eastOccupied,
      props.roomList[roomIndex].westOccupied,
      props.handleClick,
    ));
  }

  return (
    <div className="lobby-table-list">
      {roomCells}
    </div>
  );
}

LobbyRoomList.propTypes = propTypes;
LobbyRoomList.defaultProps = defaultProps;

export default LobbyRoomList;
