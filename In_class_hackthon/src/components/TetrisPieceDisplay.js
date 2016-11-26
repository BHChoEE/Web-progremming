import React, { Component } from 'react';

class TetrisPieceDisplay extends Component {
  constructor(props) {
  	super(props);
    }
  render(){
    const h = this.props.data;
    let display = [ [0,0,0,0],
                    [0,0,0,0]];
    if ( h===1 )
      display = [ [0,1,1,0],
                  [0,1,1,0]];
    else if ( h===2 )
      display = [ [0,0,0,0],
                  [2,2,2,2]];
    else if ( h===3 )
      display = [ [0,3,3,0],
                  [3,3,0,0]];
    else if ( h===4 )
      display = [ [4,4,0,0],
                  [0,4,4,0]];
    else if ( h===5 )
      display = [ [0,0,5,0],
                  [5,5,5,0]];
    else if ( h===6 )
      display = [ [6,0,0,0],
                  [6,6,6,0]];
    else if ( h===7 )
      display = [ [0,7,0,0],
                  [7,7,7,0]];

    return <div className = 'rounded'>
        {  display.map( (nums,idx) => {
                      return (<div className={'gridrow'} key={idx} >
                        {nums.map((num,idx)=>{return <div className={'grid_'+num.toString()+' diplay_grid' }  key={idx}>{ <div className={'whiteBorderDecoration'}>{num}</div> }</div>})}
           </div>);
                        })}
        </div>;
  }
}

 export default TetrisPieceDisplay;
