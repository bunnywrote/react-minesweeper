import React from 'react';
import Cell from './Cell';
import CellModel from './CellModel';

export default class Board extends React.Component {

  GameState = Object.freeze({
    RUN: Symbol("run"),
    LOSE: Symbol("lose"),
    WON: Symbol("won")
  });

  constructor(props) {
    super(props);

    this.state = {
      cells: this.initData(this.props.size),
      gameState: this.GameState.RUN,
      flags: this.props.mines,
      runningTime: 0
    };
  }

  initData = (size) => {
    let data = new Array(size)
      .fill(0)
      .map((col, i) => new Array(size)
        .fill(0)
        .map((row, j) => new CellModel(i, j, 0, 'closed'))
      );
    data = this.setMines(data);
    data = this.setAdjacentCells(data);

    return data
  }

  setMines = (data) => {
    let mines = this.props.mines;

    while (mines > 0) {
      var x = this.getRandom();
      var y = this.getRandom();

      console.log(`x: ${x}, y: ${y}`)

      if (data[x][y].value !== 99) {
        data[x][y].value = 99;
        mines--;
      }
    }

    return data;
  }

  setAdjacentCells = (data) => {
    for (var i = 0; i < this.props.size; i++) {
      for (var j = 0; j < this.props.size; j++) {

        if (data[i][j].value !== 99) {
          // console.log(`${i},${j}`)
          data[i][j].adjacentCells = this.getAdjacentCells(i, j, data)
          data[i][j].value = data[i][j].adjacentCells.reduce((n, x) => n + (x.value === 99), 0)
        }

        console.log(`${i},${j}:\t${data[i][j].value}`)
      }
    }

    return data;
  }

  getAdjacentCells = (x, y, data) => {
    const size = this.props.size - 1;
    const cells = [];

    // console.log(`x: ${x}, y: ${y}`)

    //  left
    if (x > 0) cells.push(data[x - 1][y])

    //  right
    if (x < size) cells.push(data[x + 1][y])

    //  bottom
    if (y > 0) cells.push(data[x][y - 1])

    //  up
    if (y < size) cells.push(data[x][y + 1])

    //  bottom left
    if (x > 0 && y > 0) cells.push(data[x - 1][y - 1])

    //  top left
    if (x > 0 && y < size) cells.push(data[x - 1][y + 1])

    //  bottom right
    if (x < size && y > 0) cells.push(data[x + 1][y - 1])

    //  top right
    if (x < size && y < size) cells.push(data[x + 1][y + 1])

    return cells;
  }

  onCellChange = (cell) => {

    this.updateCellState(cell, 'open');

    if (cell.value === 99) {
      this.setState({
        gameState: 'over',
      })
    }

    if (cell.value === 0) {
      for (let c of cell.adjacentCells) {
        if (c.value < 99 && c.state === 'closed') {
          this.onCellChange(c)
        }
      }
    }
  }

  setFlag = (cell) => {
    this.updateCellState(cell, 'flag')
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
    return Math.floor(Math.random() * this.props.size);
  }

  getTime = () => {
    return '07:23'
  }

  // buildPanel = () => {
  //   return <div className='game-panel'>
  //     <div className='panel-row'>
  //       <span className='panel-icon'>💣</span>
  //       <span>{this.state.flags}</span>
  //     </div>
  //     <div className='panel-row'>
  //       <span className='panel-icon'>🕒</span>
  //       <span>{this.getTime()}</span>
  //     </div>
  //   </div>
  // }

  buildPanel = () => {
    return <div className='game-panel'>
      <div className='panel-section'>
        <span className='panel-icon'>💣</span>
        <span>{this.state.flags}</span>
      </div>
      <div className='panel-section'>
        <span className='reset-icon'>
          {
            (this.state.gameState === this.GameState.LOSE) ? '😵' : '🙂'
        }
        </span>
      </div>
      <div className='panel-section'>
        <span className='panel-icon'>🕒</span>
        <span>{this.getTime()}</span>
      </div>
    </div>
  }

  render() {
    return (
      <>
        {
          this.buildPanel()
        }

        <div className='field'>
          {
            this.state.cells.map((item, i) => {
              var row = item.map((elem, j) => {
                return <Cell
                  model={elem}
                  onChange={(cell) => this.onCellChange(cell)}
                  setFlag={(cell) => this.setFlag(cell)}
                  key={`${i}${j}`} />
              }
              )
              return (
                <div className="grid-col" key={i}>{row}</div>
              );
            })
          }
        </div>
      </>
    );
  }
}