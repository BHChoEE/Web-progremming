const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.use('/api', router);
router.get('/query', (req, res) => {
  res.json(req.query);
});
// router.get('/test/pp/ss', (req, res) => {
// });
router.get('/users/:id', (req, res) => {
  if (req.params.id == 1) {
    const r = {
      id: 1,
      name: 'Joe',
      age: 18,
    };
    res.json(r);
  }
  else if (req.params.id == 2) {
    const r = {
      id: 2,
      name: 'John',
      age: 22,
    };
    res.json(r);
  }
  else
    res.send(`It's ${req.param.id}`);
});
router.get('/body', (req, res) => {
  res.sendfile('body.html');
});
router.post('/body', (req, res) => {
  res.send(JSON.stringify(req.body));
});
app.use((req, res) => {
  res.send('404');
});

app.listen(8000, () => {
  console.log('Listening on port localhost:8000');
});
