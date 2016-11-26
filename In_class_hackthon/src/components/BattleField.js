import React, { Component } from 'react';
import TetrisPieces from './TetrisPieces';
import Next from './Next'
import TetrisPieceDisplay from './TetrisPieceDisplay'
class BattleField extends Component {
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
    this.displayNext = this.displayNext.bind(this);
    this.menu = this.menu.bind(this);
    this.init = this.init.bind(this);
    this.antiRotate = this.antiRotate.bind(this);
    // this.clearRow = this.clearRow.bind(this);

    this.state = {
      field: 0,
      runningPiece: 0,
      interval: 1000,
      piecesBatch:[],
      hold:0,
      pause:true,
      started:false,
    }
  }
  init(){
    this.setState({
      field: 0,
      runningPiece: 0,
      interval: 1000,
      piecesBatch:[],
      hold:0,
      pause:false,
      started:true,
    });
    var x = new Array(10);
    for (let i = 0; i < 10; ++i)
    {
      x[i] = new Array(20);
      for (let j = 0; j < 20; ++j) {
        x[i][j] = 0;
      }
    }
    this.state.field = x;
    this.randomMakeBatch();
    this.constructNewPiece();
  }
  componentWillMount() {
    console.log('componentWillMount');
    var x = new Array(10);
    for (let i = 0; i < 10; ++i)
    {
      x[i] = new Array(20);
      for (let j = 0; j < 20; ++j) {
        x[i][j] = 0;
      }
    }

    this.state.field = x;

    var win = document.defaultView;
    win.addEventListener('keydown', (e)=>{
      if (e.key==='ArrowUp')
        this.rotate();
      else if (e.key === 'ArrowDown')
        this.down();
      else if (e.key === 'ArrowLeft')
        this.left();
      else if (e.key === 'ArrowRight')
        this.right();
      else if (e.key === 'v' || e.key === ' ')
        this.drop();
      else if (e.key === 'c')
        this.holdPiece();
      else if (e.key === 'p')
        this.setState({pause:!this.state.pause});
      else if (e.key === 'z')
        this.antiRotate();
    });
    this.randomMakeBatch();
    this.constructNewPiece();
    setInterval(()=>{
      if (!this.state.pause)
        this.down();
    },this.state.interval);
  }
  clearCompleteRow(y) {
    const f = this.state.field;
    let vec=[y-2,y-1,y,y+1,y+2].filter((i)=>{return i>=0 && i<20;});
    let beginRowNum;
    let RowsNum=0;
    for (let j=0; j<vec.length; ++j)
    {
      for (let i=0; i<10; ++i)
      { 
        if ( f[i][ vec[j] ]===0 )
          break;
        if ( i===9 )
          {
            ++RowsNum;
            beginRowNum=vec[j];
          }
      }
    }
    if (RowsNum!==0)
    {
      this.clearRow(beginRowNum,RowsNum);
    }

  }

  clearRow(beginRowNum,RowsNum) {
    var f = this.state.field;
    for (let i = beginRowNum; i>=RowsNum; --i)
    {
      for(let j=0; j<10; ++j)
      {
        f[j][i] = f[j][i-RowsNum];
        f[j][i-RowsNum]=0;
      }
    }
    this.setState({field:this.state.field});
  }
  constructNewPiece() {
    this.clearCompleteRow(this.state.runningPiece.posy);
    console.log('sent clearCompleteRow',this.state.runningPiece.posy);
    console.log('constructNewPiece()',this.state.piecesBatch[0]);
    var x = new TetrisPieces(this.state.piecesBatch.shift(),this.state.field);
    this.state.runningPiece = x;
    this.setState({runningPiece:this.state.runningPiece});
    this.setState({piecesBatch:this.state.piecesBatch});
    this.setPiece();
  }
  holdPiece() {
    this.state.runningPiece.clearTrace();
    if (this.state.hold === 0)
    {
      this.state.hold = this.state.runningPiece.type;
      this.state.runningPiece = new TetrisPieces(this.state.piecesBatch.shift(),this.state.field);
      this.setState({runningPiece:this.state.runningPiece});
      this.setState({piecesBatch:this.state.piecesBatch});
      this.setPiece();
    }
    else
    {
      const tmp = this.state.hold;
      this.state.hold = this.state.runningPiece.type;
      this.state.runningPiece = new TetrisPieces(tmp,this.state.field);
      this.setState({runningPiece:this.state.runningPiece});
      this.setPiece();
    }
  }
  rotate() {
    this.state.runningPiece.rotate();
    this.setState({field:this.state.field});
  }
  antiRotate() {
    this.state.runningPiece.antiRotate();
    this.setState({field:this.state.field});
  }
  down() {
    if( !this.state.runningPiece.down() )
      this.constructNewPiece();
    this.setState({field:this.state.field});
    this.randomMakeBatch();
  }
  drop() {
    this.state.runningPiece.drop();
    console.log('fisrt');
    this.constructNewPiece();
    console.log('second');
    this.randomMakeBatch();
  }
  left() {
    this.state.runningPiece.move_left();
    this.setState({field:this.state.field});
  }
  right() {
    this.state.runningPiece.move_right();
    this.setState({field:this.state.field});
  }
  randomMakeBatch(){
    if (this.state.piecesBatch.length <= 7)
    {
      var shuffle=[1,2,3,4,5,6,7];
      let tmp, i=7;
      while (i !== 0)
      {
        let s = Math.floor(Math.random() * i);
        tmp = shuffle[s];
        --i;
        shuffle[s] = shuffle[i];
        shuffle[i] = tmp;
      }
      if ( this.state.piecesBatch.length !== 0 )
          this.state.piecesBatch = [...this.state.piecesBatch,...shuffle];
      else
        this.state.piecesBatch = shuffle;
      return true;
    }
    console.log('NOT randomMakeBatch');
    return false;
  }
  displayHold() {
    return (
      <div className={'holdContainer'}>
        <h8>Hold</h8>
        <div className="row">
          {<TetrisPieceDisplay data={this.state.hold}></TetrisPieceDisplay>}
        </div>
        <div className="row">
          <br/>          
          <h9>Guild</h9>
          <li>Arrow up:rotate   </li>
          <li>Arrow left/right:move left/right  </li>
          <li>Arrow down: falling speed up  </li>
          <li>Space or 'v':drop  </li>
          <li>'c':hold  </li>
          <li>'p':pause </li>
          <li>'z':anti rotate</li>
        </div>
      </div>);
  }
  setPiece() {
    this.state.runningPiece.setTrace();
    this.setState({field:this.state.field});
  }
  displayNext() {
    return (
      <div className={'nextContainer'}>
        <h8>Next</h8>
        <div className={'next'}>
          {<TetrisPieceDisplay data={this.state.piecesBatch[0]}></TetrisPieceDisplay>}
        </div>
        <div className={'next'}>
          {<TetrisPieceDisplay data={this.state.piecesBatch[1]}></TetrisPieceDisplay>}
        </div>
        <div className={'next'}>
          {<TetrisPieceDisplay data={this.state.piecesBatch[2]}></TetrisPieceDisplay>}
        </div>
        <div className={'next'}>
          {<TetrisPieceDisplay data={this.state.piecesBatch[3]}></TetrisPieceDisplay>}
        </div>
        <div className={'next'}>
          {<TetrisPieceDisplay data={this.state.piecesBatch[4]}></TetrisPieceDisplay>}
        </div>
      </div>
      );
  }
  setPieceOnField() {
    return <div className={'fieldContainer'}>
            {this.state.field.map( (nums,idx) => {
                          return <div className={'gridcol'} key={idx}  >
                            {
                              <div >
                                { nums.map((num,idx)=>{return <div className={'grid_'+num.toString()+' grid' }  key={idx}>{ <div className={'whiteBorderDecoration'}>{num}</div> }</div>})}
                              </div>
                            }
                          </div>
                            })}
            </div>;
  }
  menu() {
    const bntType={
      // margin:'0 auto',
      // background:'red',
      // text-align: 'center',
      // border:'10px',
      // font-size:'100',
    }
    if( this.state.started == false )
      return  <div className="row bntType" style={bntType} >
                <button onClick={()=>{this.setState({started:true,pause:false})}} type="button" 
                className="btn btn-primary Start col-xs-6 start " >Start</button>
              </div>
    else if (this.state.pause == true)
      return (<div>
        <div className="row bntType" style={bntType} >
          <button onClick={()=>{this.init();}} type="button" className="btn btn-primary Start col-xs-5 restart" >restart</button>
        </div>
        <div className="row bntType" style={bntType} >
          <button onClick={()=>{this.setState({pause:false})}} 
          type="button" className="btn btn-primary Start col-xs-5 continue" >continue</button>
        </div>
          
        </div>)
    else
      return  <div className="row bntType" style={bntType} >
                <button onClick={()=>{this.setState({pause:true})}}type="button" 
                className="btn btn-primary col-xs-6 pause active" aria-pressed="false" >Pause</button>
              </div>
  }
  render() {
    const test={
      background:'',
    }
    return (
      <div>
        <div className="row">
          <div className="col-xs-2" style={test}>{this.displayHold()}</div>
          <div className="col-xs-3" style={{background:'',}}>
            {this.setPieceOnField()}
            {this.menu()}
          </div>
          <div className="col-xs-1" style={{float:'left',}}>{this.displayNext()}</div>
        </div>
      </div>

      );

  }
}

export default BattleField;
