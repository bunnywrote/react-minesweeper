import React, { useState } from 'react';

/*

cellState: open | close | flagged
cellValue: [0-99] | -   | 

*/

const Cell = (props) => {

  // const isOpen = props.model.state === 'open'
  const isFlagged = props.model.state === 'flag'
  const isOpen = true
  const x = props.model.x
  const y = props.model.y
  const value = props.model.value

  const handleCellClick = () => {
    props.onChange(props.model);
  }

  const handleRightClick = (event) => {
    props.setFlag(props.model)

    event.preventDefault()
  }

  const getCellContent = () => {
    if (isFlagged) return <h2>🚩</h2>
    if (isOpen) return <h2>
      {
        (value === 99) ? '💣' : (value > 0) ? value : ''
      }
    </h2>

    return;
  }

  const getCellClass = () => {
    return (isOpen) ? (value === 99) ? 'cell-bomb' : 'cell-open' : 'cell-close'
  }

  return (
    <div
      className={`grid-cell ${getCellClass()}`}
      onClick={handleCellClick}
      onContextMenu={handleRightClick}
    >
      <div className="coordinates">
        {
          getCellContent() ?? <p>{`${x},${y}`}</p>
        }
      </div>
    </div>
  );
}

export default Cell;