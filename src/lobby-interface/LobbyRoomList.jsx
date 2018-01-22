import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Icon } from 'semantic-ui-react';

const propTypes = {
  roomList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    eastId: PropTypes.string,
    westId: PropTypes.string,
  })).isRequired,
  handleClick: PropTypes.func.isRequired,
};

function generateTableCell(id, eastId, westId, count, handleClick) {
  const handleClickEast = () => { handleClick(id, 'EAST'); };
  const handleClickWest = () => { handleClick(id, 'WEST'); };
  const handleClickObserver = () => { handleClick(id, null); };

  const westCell = ((westId) ?
    <Segment size="small"> {westId} </Segment> : (
      <Button onClick={handleClickWest} size="small" color="teal">
        <Icon name="plus" /> Sit West
      </Button>));

  const eastCell = ((eastId) ?
    <Segment size="small"> {eastId} </Segment> : (
      <Button onClick={handleClickEast} size="small" color="teal">
        <Icon name="plus" /> Sit East
      </Button>));

  return (
    <Segment key={id} className="lobby-room-cell">
      <Segment className="room-name" size="small"> {`${id}'s Table`} </Segment>
      <div className="room-seat-button">
        {westCell}
        {eastCell}
      </div>
      <Button className="watch-button" onClick={handleClickObserver} size="small" color="blue">
        <Icon name="plus" /> Watch
      </Button>
      <p>{count} viewer</p>
    </Segment>
  );
}

function LobbyRoomList(props) {
  const roomCells = [];
  const noResultTemplate = <p>No result</p>;

  for (let roomIndex = 0; roomIndex < props.roomList.length; roomIndex += 1) {
    roomCells.push(generateTableCell(
      props.roomList[roomIndex].id,
      props.roomList[roomIndex].eastId,
      props.roomList[roomIndex].westId,
      props.roomList[roomIndex].count,
      props.handleClick,
    ));
  }

  return (
    <div className="lobby-room-list">
      { roomCells.length > 0 ? roomCells : noResultTemplate}
    </div>
  );
}

LobbyRoomList.propTypes = propTypes;

export default LobbyRoomList;
