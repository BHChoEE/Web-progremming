/* eslint-disable no-console */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
// var io = require('socket.io'); 
// import io from 'socket.io'

const bodyParser = require('body-parser');
import api from './api';
import config from './webpack.config';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use('/api', api);
console.log('fuck');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});




var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(port);  //listen on port 80

var allClients = [];
var games=[]//success measn 1 , fail means 0
var leader = 0;

function broadcast(value,command) {
  console.log('broadcast',command);
  for (let i = 0; i<allClients.length; ++i)
  {
    const socketid = allClients[i];
    io.to(socketid).emit(command, value);
  }
}
function allocate(s) {
  for (let i = 0; i<allClients.length; ++i)
  {
    const socketid = allClients[i];
    io.to(socketid).emit('message', i);
    console.log('allo',i);
  }
}

function end(){
  console.log('check end');
  let success=0
  let fail=0;
  for(let i =0; i<games.length; ++i)
  {
    if(game[i])
      ++success;
    else
      ++fail;
  }
  if(fail === 3)
    return -1;
  else if(success === 3)
    return 1;
  else 
    return 0;
}
function asign_Leader() {
  console.log('asign_Leader');
  broadcast(allClients[0],'asign_Leader');
  // io.socket.broadcast.emit('msg','asign_Leader');
  return true;

}
function vote() {
  console.log('vote');
  let counter=0;
  let vote=0;
  io.sockets.on('vote',(e)=>{
    ++counter;
    vote+=e;
  });
  if(counter==3)
  {
    if(vote == 2)
      return true;
    else 
      return false;
  }
}
function mission() {
  console.log('mission');
  let counter=0;
  let mission=0;
  io.sockets.on('vote',(e)=>{
    ++counter;
    mission+=e;
  });
  if(counter==3)
  {
    if(mission==2)
      return true;
    else
      return false;
  } 
}
// socket.broadcast.emit
  // var promise = new Promise((resolve)=>{ 
  //   resolve('none');
  // });

  // let p1 = promise.then((v)=>{
  // let x='bitch';
  // setTimeout(
  // () => {
  //     console.log(v);
  //     x='haha';
  // }, 5000);
  // return x;
  // });

  // let p2 = p1.then((v)=>{
  //   console.log(v+'p2');
  // });


function playing() {
  var promise = new Promise((resolve)=>{ 
    resolve('none');
  });
  while (!end()){
    console.log(promise);
    promise.then((v)=>{
      return asign_Leader();
    ;})
    .then((v)=>console.log(v))
    break;
    // .then((v)=>{
    //   vote();
    // ;})
    // .then((v)=>{
    //   mission();
    // ;})
  };
}

io.sockets.on('connection', function(socket) {
  allClients.push(socket.id);
  socket.emit('myid',socket.id);
  // socket.broadcast.emit('msg',allClients);
  if(allClients.length === 3)
  {
    socket.broadcast.emit('start',allClients);
    socket.emit('start',allClients);
    console.log('start');
    playing();
  }
  socket.on('disconnect',()=>{
    const idx = allClients.indexOf(socket.id);
    const msg = socket.id;
    allClients.splice(idx, 1);
    socket.broadcast.emit('msg',msg+'  leave');
  });
//   socket.on('a',(e)=>{
//     console.log(e);
//     socket.emit('b', { hello: 'world' });
//     socket.broadcast.emit('c','broadcast');
//   })
});
const socketid = allClients[0];
  // io.to(socketid).emit('message', 0);
// var connectedNumber = 0;
// io.on('connection', function (socket) {
//   connectedNumber = connectedNumber + 1;
//   // socket.emit('news', { hello: 'world' });
//   // socket.on('my other event', function (data) {
//   //   console.log(data);
//   // });
//   // socket.on('click',function(d) {
//   //   console.log(d);
//   // });
//   socket.emit('register',connectedNumber );
//   socket.on('vote',(d)=>{console.log(d);});
//   socket.on('disconnection',()=>{--connectedNumber;console.log()});

// });
// // io.to(socketid).emit('message', 'for your eyes only')
// // io.sockets.connected[socketid].emit('message', 'for your eyes only');
// io.on('click',function(socket) {
//   socket.on('click',function(d) {
//     console.log(d);
//   });
// });
// socket.on('vote',(d)=>{console.log(d);})