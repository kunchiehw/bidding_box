import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const propTypes = {
  tableList: PropTypes.arrayOf(PropTypes.shape({
    tableName: PropTypes.string.isRequired,
    eastOccupied: PropTypes.boolean.isRequired,
    westOccupied: PropTypes.boolean.isRequired,
  })),
  handleClick: PropTypes.function.isRequired,
};

const defaultProps = {
  tableList: null,
};

function generateTableCell(tableName, eastOccupied, westOccupied, handleClick) {
  const handleClickEast = () => { handleClick(tableName, 'EAST'); };
  const handleClickWest = () => { handleClick(tableName, 'WEST'); };

  return (
    <div key={tableName} className="table-cell">
      <Button
        className="table-seat-button"
        onClick={handleClickWest}
        disabled={westOccupied}
        size="small"
      >
          West
      </Button>
      <div className="table-name">
        {tableName}
      </div>
      <Button
        className="table-seat-button"
        onClick={handleClickEast}
        disabled={eastOccupied}
        size="small"
      >
          East
      </Button>
    </div>
  );
}

function LobbyTableList(props) {
  const tableCells = [];

  for (let tableIndex = 0; tableIndex < props.tableList.length; tableIndex += 1) {
    tableCells.push(generateTableCell(
      props.tableList[tableIndex].tableName,
      props.tableList[tableIndex].eastOccupied,
      props.tableList[tableIndex].westOccupied,
      props.handleClick,
    ));
  }

  return (
    <div className="lobby-table-list">
      {tableCells}
    </div>
  );
}

LobbyTableList.propTypes = propTypes;
LobbyTableList.defaultProps = defaultProps;

export default LobbyTableList;
