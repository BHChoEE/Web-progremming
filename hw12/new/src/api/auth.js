import { Router } from 'express';
import models from '../models';
const { users } = models;
const articleRouter = new Router();
var bcrypt = require('bcryptjs');

articleRouter.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  console.log({ email, password, name } );
  const user = await users.create({
	email, password, name,
  });

  res.json(user);
});


articleRouter.post('/signin', async (req, res) => {
	const { password, name } = req.body;
	console.log('/signin',{ password, name });
  	const User = await users.find({
		where: {
			name: name,
		},
	});
	if(bcrypt.compareSync(password, User.password))
		res.json({status:true,id:User.id});
	else
		res.json({status:false});
  
});


export default articleRouter;
