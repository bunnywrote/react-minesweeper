import React, { Component } from 'react';
import Cell from './Cell';
import CellModel from './CellModel';

export default class Field extends React.Component {
  constructor(props) {
    super(props);

    var myGrid = new Array(this.props.size)
      .fill(0)
      .map((col, i) => new Array(this.props.size)
        .fill(0)
        .map((row, j) => new CellModel(i, j, 0, 'closed'))
      );

    this.state = {
      cells: myGrid
    };

    this.generateMines();
  }

  generateMines = () => {
    let mines = this.props.size;

    while (mines > 0) {
      var mine = this.getRandom();

      var x = Math.floor(mine / 10);
      var y = mine % 10;

      console.log(`x: ${x}, y: ${y}`)

      if (this.state.cells[x][y].value !== 99) {
        let updated = this.state.cells;
        updated[x][y] = new CellModel(x, y, 99, 'closed');

        this.setState({
          cells: updated,
        })

        this.fillAdjacentCells(x, y);

        mines--;
      }
    }
  }

  fillAdjacentCells = (x, y) => {
    const size = this.props.size;

    //todo: beautify

    if (x - 1 >= 0 && this.state.cells[x - 1][y].value !== 99)
      this.increaseCellValue(x - 1, y);

    if (x - 1 >= 0 && y - 1 >= 0 && this.state.cells[x - 1][y - 1].value !== 99)
      this.increaseCellValue(x - 1, y - 1);

    if (x - 1 >= 0 && y + 1 < size && this.state.cells[x - 1][y + 1].value !== 99)
      this.increaseCellValue(x - 1, y + 1);

    if (x + 1 < size && this.state.cells[x + 1][y].value !== 99)
      this.increaseCellValue(x + 1, y);

    if (x + 1 < size && y - 1 >= 0 && this.state.cells[x + 1][y - 1].value !== 99)
      this.increaseCellValue(x + 1, y - 1);

    if (x + 1 < size && y + 1 < size && this.state.cells[x + 1][y + 1].value !== 99)
      this.increaseCellValue(x + 1, y + 1);

    if (y - 1 >= 0 && this.state.cells[x][y - 1].value !== 99)
      this.increaseCellValue(x, y - 1);

    if (y + 1 < size && this.state.cells[x][y + 1].value !== 99)
      this.increaseCellValue(x, y + 1);
  }

  openAdjacentEmptyCells = (x, y) => {
    const size = this.props.size;
    
    //todo: beautify

    if (x - 1 >= 0 && this.state.cells[x - 1][y].value === 0 && this.isClosed(this.state.cells[x - 1][y]))
      this.openEmptyCell(x - 1, y);

    if (x - 1 >= 0 && y - 1 >= 0 && this.state.cells[x - 1][y - 1].value === 0 && this.isClosed(this.state.cells[x - 1][y - 1]))
      this.openEmptyCell(x - 1, y - 1);

    if (x - 1 >= 0 && y + 1 < size && this.state.cells[x - 1][y + 1].value === 0 && this.isClosed(this.state.cells[x - 1][y + 1]))
      this.openEmptyCell(x - 1, y + 1);

    if (x + 1 < size && this.state.cells[x + 1][y].value === 0 && this.isClosed(this.state.cells[x + 1][y]))
      this.openEmptyCell(x + 1, y);

    if (x + 1 < size && y - 1 >= 0 && this.state.cells[x + 1][y - 1].value === 0 && this.isClosed(this.state.cells[x + 1][y - 1]))
      this.openEmptyCell(x + 1, y - 1);

    if (x + 1 < size && y + 1 < size && this.state.cells[x + 1][y + 1].value === 0 && this.isClosed(this.state.cells[x + 1][y + 1]))
      this.openEmptyCell(x + 1, y + 1);

    if (y - 1 >= 0 && this.state.cells[x][y - 1].value === 0 && this.isClosed(this.state.cells[x][y - 1]))
      this.openEmptyCell(x, y - 1);

    if (y + 1 < size && this.state.cells[x][y + 1] === 0 && this.isClosed(this.state.cells[x][y + 1]))
      this.openEmptyCell(x, y + 1);
  }

  increaseCellValue = (x, y) => {
    let updated = this.state.cells;
    updated[x][y].value += 1;

    this.setState({
      cells: updated,
    })
  }

  openEmptyCell = (x, y) => {

    this.updateCellState(this.state.cells[x][y], 'open')
    this.openAdjacentEmptyCells(x, y);
  }

  isClosed = (cell) => {
    return cell.state === 'closed';
  }

  onCellChange = (cell) => {
    console.log(cell);
    this.updateCellState(cell, 'open');

    if(cell.value === 0){
      this.openAdjacentEmptyCells(cell.x, cell.y);
    }
  }

  updateCellState = (cell, state) => {
    console.log(`set state [${cell.x},${cell.y}]:\t${state}`);

    let updated = this.state.cells;
    updated[cell.x][cell.y].state = state;

    this.setState({
      cells: updated,
    })
  }

  getRandom = () => {
    const cellsCount = this.props.size * this.props.size;
    const randomNumber = Math.floor(Math.random() * cellsCount);

    return randomNumber;
  }

  render() {
     return (
      <div className='field'>
        {
          this.state.cells.map((item, i) => {
            var row = item.map((elem, j) => 
              {
                return <Cell 
                  model={elem} 
                  // onEmpty={(x, y) => this.openAdjacentEmptyCells(x, y)} 
                  onChange={(cell) => this.onCellChange(cell)}
                  key={`${i}${j}`}/>
              }
            )
            return (
              <div className="grid-col" key={i}>{row}</div>
            );
          })
        }
      </div>
    );
  }
}