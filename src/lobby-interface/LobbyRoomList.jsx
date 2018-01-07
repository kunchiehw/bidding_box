import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Icon } from 'semantic-ui-react';

const propTypes = {
  roomList: PropTypes.arrayOf(PropTypes.shape({
    roomName: PropTypes.string.isRequired,
    eastID: PropTypes.string,
    westID: PropTypes.string,
  })),
  handleClick: PropTypes.func.isRequired,
};

const defaultProps = {
  roomList: null,
};

function generateTableCell(roomName, eastID, westID, handleClick) {
  const handleClickEast = () => { handleClick(roomName, 'EAST'); };
  const handleClickWest = () => { handleClick(roomName, 'WEST'); };
  const handleClickObserver = () => { handleClick(roomName, 'OBSERVER'); };

  const westCell = ((westID && westID.length !== 0) ?
    <Segment size="small"> {westID} </Segment> : (
      <Button onClick={handleClickWest} size="small" color="teal">
        <Icon name="plus" /> Sit West
      </Button>));

  const eastCell = ((eastID && eastID.length !== 0) ?
    <Segment size="small"> {eastID} </Segment> : (
      <Button onClick={handleClickEast} size="small" color="teal">
        <Icon name="plus" /> Sit East
      </Button>));

  return (
    <Segment key={roomName} className="lobby-room-cell">
      <Segment className="room-name" size="small"> {`${roomName}'s Table`} </Segment>
      <div className="room-seat-button">
        {westCell}
        {eastCell}
      </div>
      <Button className="watch-button" onClick={handleClickObserver} size="small" color="blue">
        <Icon name="plus" /> Watch
      </Button>
    </Segment>
  );
}

function LobbyRoomList(props) {
  const roomCells = [];

  for (let roomIndex = 0; roomIndex < props.roomList.length; roomIndex += 1) {
    roomCells.push(generateTableCell(
      props.roomList[roomIndex].roomName,
      props.roomList[roomIndex].eastID,
      props.roomList[roomIndex].westID,
      props.handleClick,
    ));
  }

  return (
    <div className="lobby-room-list">
      {roomCells}
    </div>
  );
}

LobbyRoomList.propTypes = propTypes;
LobbyRoomList.defaultProps = defaultProps;

export default LobbyRoomList;
