import React, { Component } from 'react';
import { render } from 'react-dom';
import Field from './Field';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div className="game">
        <Field size={10}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
