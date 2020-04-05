import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      boardSize: 10,
      minesCount: 20
    };
  }

  render() {
    return (
      <div className="game">
        <Board size={this.state.boardSize} mines={this.state.minesCount}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
