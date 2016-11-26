import React, { Component } from 'react';
import './grid.css';
// import TetrisPieces from './TetrisPieces';
import './TetrisPieces.js';
import BattleField from './BattleField';
// import SingleUserPage from './SingleUserPage';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div >
        <div className="row titleRow">
          <p className={'title col-xs-3'}>Tetris Battle!</p>
        </div>
      <BattleField/>
      </div>);
  }

}

export default App;