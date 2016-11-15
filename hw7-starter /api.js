import { Router } from 'express';

const router = new Router();

const users = [
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


router.post('/userss', (req, res) => {
	console.log('bo',req.body.json(),'Lo');
	res.json(req.body );
});

export default router;
