import React, { Component } from 'react';

class Next extends Component {
  constructor(props) {
  	super(props);
  	this.drop = this.drop.bind(this);
    this.rotate = this.rotate.bind(this);
    this.down = this.down.bind(this);
    this.drop = this.drop.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.randomMakeBatch = this.randomMakeBatch.bind(this);
  	this.constructNewPiece = this.constructNewPiece.bind(this);
    this.setPiece = this.setPiece.bind(this);
    this.setPieceOnField = this.setPieceOnField.bind(this);
    this.holdPiece = this.holdPiece.bind(this);
    this.displayHold = this.displayHold.bind(this);
    this.clearCompleteRow = this.clearCompleteRow.bind(this);
    this.clearRow = this.clearRow.bind(this);
    this.state = {
      field: 0,
      runningPiece: 0,
      interval: 1000,
      piecesBatch:[2,3,6,7],
      hold:0,
      pause:false
    }
  }
    render() {
    	return 0;
    }
  }

 export default Next;