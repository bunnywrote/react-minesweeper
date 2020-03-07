import React, { useState } from 'react';

const Cell = (props) => {

  const isOpen = props.model.state === 'open'
  // const isOpen = true
  const x = props.model.x
  const y = props.model.y
  const value = props.model.value

  const handleCellClick = () => {
    
    props.onChange(props.model);
    
  }

  const getCellContent = () => {
    return <h2>
      {
        (value === 99) ? '💣' : (value > 0) ? value : ''
      }
    </h2>
  }

  const getCellClass = () => {
    return (isOpen) ? (value === 99) ? 'cell-bomb' : 'cell-open' : 'cell-close'
  }

  return (
    <div className={`grid-cell ${getCellClass()}`} onDoubleClick={() => handleCellClick()}>
      <div className="coordinates">
        {
          (isOpen) ? getCellContent() : <p>{`${x},${y}`}</p>
        }
      </div>
    </div>
  );
}

export default Cell;