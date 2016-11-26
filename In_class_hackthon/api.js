import { Router } from 'express';




const router = new Router();

var users = [
    { avatar: 'http://xxx.com', name: 'John', age: 23 },
    { avatar: 'http://xxx.com', name: 'Amy', age: 18 },
];
// Write your restful api here:
router.get( '/users', (req, res) => {
	res.json( users );
	console.log('users',users);
});

router.get('/users/:id', (req, res) => {
	res.json(users[req.params.id - 1]);
});


router.post('/users', (req, res) => {
	users=[...users, req.body]
	console.log(users);
	res.send(JSON.stringify(req.body));

});

export default router;
