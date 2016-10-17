const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

router.get('/query',function(req, res) {
  	res.json(req.query);
});

router.post('/body', function(req, res) {
  	res.json(req.body);
});

//for testing post
router.get('/body', function(req, res) {
  	res.sendfile('body.html');
});

router.get('/users/:id', function(req, res) {
	let id =req.params.id;
	if(id === '1'){
		const result={
			"id": 1,
			"name": "Joe",
			"age": 18
	    }
	    res.json(result);
	}
	else if(id === '2'){
		const result={
			"id": 2,
			"name": "John",
			"age": 22
	    }
	    res.json(result);
	}
	else 
		res.send('404');
 	
});

app.use('/api', router);
app.get('/', function(req, res) {
  	res.sendfile('index.html');
});
app.use(function(req, res) {
  	res.send('404');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
