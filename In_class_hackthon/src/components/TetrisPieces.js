class TetrisPieces {
  constructor(type, field) {
  	this.type = type;//from 1 to 7, 0 means empty
    this.rotation = 0;//from 0 to 3
    this.field = field;
    this.posx = 5;
    this.posy = 1;
    this.down = this.down.bind(this);
    this.drop = this.drop.bind(this);
    this.move_left = this.move_left.bind(this);
    this.move_right = this.move_right.bind(this);
    this.check_if_not_be_blocked = this.check_if_not_be_blocked.bind(this);
    this.clearTrace = this.clearTrace.bind(this);
    this.setTrace = this.setTrace.bind(this);
    this.rotate = this.rotate.bind(this);
    this.antiRotate = this.antiRotate.bind(this);
    // this.setTrace();
  }

  setTrace() {
    const t = this.type;
    const r = this.rotation;
    const x = this.posx;
    const y = this.posy;
    var f = this.field;
    // console.log('settrace in TetrisPieces',t,r,x,y,f);
    if ( t === 1)
      f[x][y] = f[x-1][y] = f[x][y-1] = f[x-1][y-1] = 1 ;
    else if ( t === 2 )
      {
        if(r === 0 )
          f[x][y] = f[x-1][y] = f[x-2][y] = f[x+1][y] = 2;
        else if ( r === 1 )
          f[x][y] = f[x][y-1] = f[x][y+1] = f[x][y+2] = 2;
      }
    else if ( t === 3 )
      {
        if( r === 0 )
          f[x][y] = f[x+1][y] = f[x][y+1] = f[x-1][y+1] = 3 ;
        else if ( r === 1)
          f[x][y] = f[x][y-1] = f[x+1][y] = f[x+1][y+1] = 3 ;
      }
    else if ( t === 4 )
      {
        if( r === 0 )
          f[x][y] = f[x-1][y] = f[x][y+1] = f[x+1][y+1] = 4 ;
        else if(  r === 1 )
          f[x][y] = f[x+1][y] = f[x][y+1] = f[x+1][y-1] = 4 ;
      }
    else if ( t === 5 )
      {
        if( r === 0 )
          f[x][y] = f[x-1][y] = f[x+1][y] = f[x-1][y+1] = 5;
        else if( r === 1 )
          f[x][y] = f[x][y-1] = f[x][y+1] = f[x+1][y+1] = 5;
        else if( r === 2 )
          f[x][y] = f[x+1][y] = f[x-1][y] = f[x+1][y-1] = 5;
        else if( r === 3 )
          f[x][y] = f[x][y+1] = f[x][y-1] = f[x-1][y-1] = 5;
      }
    else if ( t === 6 )
      {
        if( r === 0 )
          f[x][y] = f[x-1][y] = f[x+1][y] = f[x+1][y+1] = 6;
        else if( r === 1 )
          f[x][y] = f[x][y+1] = f[x][y-1] = f[x+1][y-1] = 6;
        else if( r === 2 )
          f[x][y] = f[x+1][y] = f[x-1][y] = f[x-1][y-1] = 6;
        else if( r === 3) 
          f[x][y] = f[x][y+1] = f[x][y-1] = f[x-1][y+1] = 6;
      }
    else if ( t === 7 )
      {
        if( r === 0 )
          f[x][y] = f[x+1][y] = f[x-1][y] = f[x][y+1] = 7;
        else if(  r === 1 )
          f[x][y] = f[x+1][y] = f[x][y+1] = f[x][y-1] = 7;
        else if(  r === 2 )
          f[x][y] = f[x+1][y] = f[x-1][y] = f[x][y-1] = 7;
        else if(  r === 3 )
          f[x][y] = f[x-1][y] = f[x][y+1] = f[x][y-1] = 7;
      }
  }
  clearTrace() {
    const t = this.type;
    const r = this.rotation;
    const x = this.posx;
    const y = this.posy;
    var f = this.field;
    if ( t === 1 && x<=9 && x>=1 )
      {
        f[x][y] = f[x-1][y] = f[x][y-1] = f[x-1][y-1] = 0 ;
        return true;
      }
    else if ( t === 2 )
      {
        if( r === 0 && x<=8 && x>=2 )
          {
            f[x][y] = f[x-1][y] = f[x-2][y] = f[x+1][y] = 0;
            return true;
          }
        else if ( r === 1 && x<=9 && x>=0 )
          {
            f[x][y] = f[x][y+1] = f[x][y+2] = f[x][y-1] = 0;
            return true;
          }
      }
    else if ( t === 3 )
      {
        if( r === 0 && x<=8 && x>=1  )
          {
            f[x][y] = f[x+1][y] = f[x][y+1] = f[x-1][y+1] = 0 ;
            return true;
          }
        else if ( r === 1 && x<=8 && x>=0 )
          {
            f[x][y] = f[x][y-1] = f[x+1][y] = f[x+1][y+1] = 0 ;
            return true;
          }
      }
    else if ( t === 4 )
      {
        if( r === 0 && x<=8 && x>=1  )
          {
            f[x][y] = f[x-1][y] = f[x][y+1] = f[x+1][y+1] = 0 ;
            return true;
          }
        else if(  r === 1 && x<=8 && x>=0  )
          {
            f[x][y] = f[x+1][y] = f[x][y+1] = f[x+1][y-1] = 0 ;
            return true;
          }
      }
    else if ( t === 5 )
      {
        if( r === 0 && x<=8 && x>=1  )
          {
            f[x][y] = f[x-1][y] = f[x+1][y] = f[x-1][y+1] = 0;
            return true;
          }
        else if( r === 1 && x<=8 && x>=0  )
          {
            f[x][y] = f[x][y-1] = f[x][y+1] = f[x+1][y+1] = 0;
            return true;
          }
        else if( r === 2 && x<=8 && x>=1  )
          {
            f[x][y] = f[x+1][y] = f[x-1][y] = f[x+1][y-1] = 0;
            return true;
          }
        else if( r === 3 && x<=9 && x>=1  )
          {
            f[x][y] = f[x][y+1] = f[x][y-1] = f[x-1][y-1] = 0;
            return true;
          }
      }
    else if ( t === 6 )
      {
        if( r === 0 && x<=8 && x>=1  )
          {
            f[x][y] = f[x-1][y] = f[x+1][y] = f[x+1][y+1] = 0;
            return true;
          }
        else if( r === 1 && x<=8 && x>=0  )
          {
            f[x][y] = f[x][y+1] = f[x][y-1] = f[x+1][y-1] = 0;
            return true;
          }
        else if( r === 2 && x<=8 && x>=1  )
          {
            f[x][y] = f[x+1][y] = f[x-1][y] = f[x-1][y-1] = 0;
            return true;
          }
        else if( r === 3 && x<=9 && x>=1 ) 
          {
            f[x][y] = f[x][y+1] = f[x][y-1] = f[x-1][y+1] = 0;
            return true;
          }
      }
    else if ( t === 7 )
      {
        if( r === 0 && x<=8 && x>=1  )
          {
            f[x][y] = f[x+1][y] = f[x-1][y] = f[x][y+1] = 0;
            return true;
          }
        else if(  r === 1 && x<=8 && x>=0  )
          {
            f[x][y] = f[x+1][y] = f[x][y+1] = f[x][y-1] = 0;
            return true;
          }
        else if(  r === 2 && x<=8 && x>=1  )
          {
            f[x][y] = f[x+1][y] = f[x-1][y] = f[x][y-1] = 0;
            return true;
          }
        else if(  r === 3 && x<=9 && x>=1  )
          {
            f[x][y] = f[x-1][y] = f[x][y+1] = f[x][y-1] = 0;
            return true;
          }
      }
      return false;
  }
  antiRotate(){
    console.log('antiR');
    const originRotate = this.rotation;
    this.clearTrace();
    if (this.type === 2)
      {
        this.rotation = (this.rotation +3) % 2;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 3)
      {
        this.rotation = (this.rotation +3) % 2;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 4)
      {
        this.rotation = (this.rotation +3) % 2;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 5)
      {
        this.rotation = (this.rotation + 1) % 4;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 6)
      {
        this.rotation = (this.rotation + 1) % 4;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 7)
      {
        this.rotation = (this.rotation + 1) % 4;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    this.setTrace();
    return true;
  }
  rotate() {//if can rotation, rotation and return true; else still and return false;
    const originRotate = this.rotation;
    this.clearTrace();
    if (this.type === 2)
      {
        this.rotation = (this.rotation + 1) % 2;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 3)
      {
        this.rotation = (this.rotation + 1) % 2;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 4)
      {
        this.rotation = (this.rotation + 1) % 2;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 5)
      {
        this.rotation = (this.rotation + 3) % 4;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 6)
      {
        this.rotation = (this.rotation + 3) % 4;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    else if (this.type === 7)
      {
        this.rotation = (this.rotation + 3) % 4;
        if (!this.check_if_not_be_blocked())
          {
            this.rotation = originRotate;
            this.setTrace();
            return false;
          }
      }
    this.setTrace();
    return true;
  }
  check_if_not_be_blocked(){ //return False if be blocked
    const t = this.type;
    const r = this.rotation;
    const x = this.posx;
    const y = this.posy;
    const f = this.field;
    if ( t === 1)
    {
      if ( x<=9 && x>=1 && f[x][y]===0 && f[x-1][y]===0 && f[x][y-1]===0 && f[x-1][y-1]===0)
        return true;
    }
    else if ( t === 2 )
    {
      if(( r === 0 && x<=8 && x>=2 && f[x][y]===0 && f[x-1][y]===0 && f[x-2][y]===0 && f[x+1][y]===0 )
      ||(  r === 1 && x<=9 && x>=0 && f[x][y]===0 && f[x][y-1]===0 && f[x][y+2]===0 && f[x][y+1]===0 ))
        return true;
    }
    else if ( t === 3 )
    { 
      if(( r === 0 && x<=8 && x>=1 && f[x][y]===0 && f[x+1][y]===0 && f[x][y+1]===0 && f[x-1][y+1]===0 )
      ||(  r === 1 && x<=8 && x>=0 && f[x][y]===0 && f[x][y-1]===0 && f[x+1][y]===0 && f[x+1][y+1]===0 ))
        return true;
    }
    else if ( t === 4 )
    { 
      if(( r === 0 && x<=8 && x>=1 && f[x][y]===0 && f[x-1][y]===0 && f[x][y+1]===0 && f[x+1][y+1]===0 )
      ||(  r === 1 && x<=8 && x>=0 && f[x][y]===0 && f[x+1][y]===0 && f[x][y+1]===0 && f[x+1][y-1]===0 ))
        return true;
    }
    else if ( t === 5 )
    { 
      if(( r === 0 && x<=8 && x>=1 && f[x][y]===0 && f[x-1][y]===0 && f[x+1][y]===0 && f[x-1][y+1]===0 )
      ||(  r === 1 && x<=8 && x>=0 && f[x][y]===0 && f[x][y+1]===0 && f[x][y+1]===0 && f[x+1][y+1]===0 )
      ||(  r === 2 && x<=8 && x>=0 && f[x][y]===0 && f[x+1][y]===0 && f[x-1][y]===0 && f[x+1][y-1]===0 )
      ||(  r === 3 && x<=9 && x>=1 && f[x][y]===0 && f[x][y+1]===0 && f[x][y-1]===0 && f[x-1][y-1]===0 ))
        return true;
    }
    else if ( t === 6 )
    { 
      if(( r === 0 && x<=8 && x>=1 && f[x][y]===0 && f[x-1][y]===0 && f[x+1][y]===0 && f[x+1][y+1]===0 )
      ||(  r === 1 && x<=8 && x>=0 && f[x][y]===0 && f[x][y+1]===0 && f[x][y+1]===0 && f[x+1][y-1]===0 )
      ||(  r === 2 && x<=8 && x>=0 && f[x][y]===0 && f[x+1][y]===0 && f[x-1][y]===0 && f[x-1][y-1]===0 )
      ||(  r === 3 && x<=9 && x>=1 && f[x][y]===0 && f[x][y+1]===0 && f[x][y-1]===0 && f[x-1][y+1]===0 ))
        return true;
    }
    else if ( t === 7 )
    { 
      if(( r === 0 && x<=8 && x>=1 && f[x][y]===0 && f[x+1][y]===0 && f[x-1][y]===0 && f[x][y+1]===0 )
      ||(  r === 1 && x<=8 && x>=0 && f[x][y]===0 && f[x+1][y]===0 && f[x][y+1]===0 && f[x][y-1]===0  )
      ||(  r === 2 && x<=8 && x>=1 && f[x][y]===0 && f[x+1][y]===0 && f[x-1][y]===0 && f[x][y-1]===0  )
      ||(  r === 3 && x<=9 && x>=1 && f[x][y]===0 && f[x-1][y]===0 && f[x][y+1]===0 && f[x][y-1]===0  ))
        return true;
    }
    return false;
  }
  move_right() {
    if (!this.clearTrace())
      return false;
    this.posx = this.posx + 1;
    if (!this.check_if_not_be_blocked())
    {
      this.posx = this.posx - 1;
       this.setTrace();
      return false;
    }
    this.setTrace();
    return true;
  }
  move_left() {
    if (!this.clearTrace())
      return false;
    this.posx = this.posx - 1;
    if (!this.check_if_not_be_blocked())
    {
      this.posx = this.posx + 1;
      this.setTrace();
      return false;
    }
    this.setTrace();
    return true;
  }
  drop() {
    this.clearTrace();
    while(this.check_if_not_be_blocked())
      this.posy = this.posy + 1;
    this.posy = this.posy - 1;
    this.setTrace();
    return true;
  }
  down() {
    this.clearTrace();
    this.posy = this.posy + 1;
    if (!this.check_if_not_be_blocked())
    {
      this.posy = this.posy - 1;
      this.setTrace();
      return false;
    }
    this.setTrace();
    return true;
  }
}

 export default TetrisPieces;
