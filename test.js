const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
});

server.listen(PORT, function() {
  console.log(`Server listening on: http://localhost:${PORT}`);
});


app.get('/', function (req, res) {
  res.send("<h1>首頁</h1>");
});


app.get('/api/query', function (req, res) {
   res.send(JSON.stringify(req.body));
});

/*
app.use('/', function (req, res) {
  const user = {
    name: 'cph',
    age: 23,
  };
  res.json(user);
});*/

