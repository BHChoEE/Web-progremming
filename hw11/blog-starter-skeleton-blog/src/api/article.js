import { Router } from 'express';
import { Article } from '../models/';
// import model

const articleRouter = new Router();

articleRouter.get('/', (req, res) => {
  const query = Article.find({});
  query.exec((err, doc) => {
    if (err) {
      res.status(404).send();
      return;
    }
    res.json(doc);
  });
});

articleRouter.get('/:id', (req, res) => {
  console.log('get by id');
  Article.findById(req.params.id, (err, doc) => {
    if (err) {
      res.status(400).send();
      return;
    }
    res.json(doc);
  });
});

articleRouter.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.body.title);

  Article.create({
    	title: req.body.title,
    	content: req.body.content,
    	tags: req.body.tags,
  })
    .then(ret => {
    	res.send(ret._id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
  // const doc = new Model({ name: 'web-seminar' });
  // doc.save();
});

articleRouter.put('/:id', (req, res) => {
  console.log('PUT the data');
  console.log(req.body);
  Article.findOneAndUpdate({ _id: req.params.id }, {
    tags: req.body.tags || [],
    content: req.body.content,
    title: req.body.title,
  }).exec((err, doc) => {
    if (err) {
      console.log(err);
      res.status(400).send;
    }
  });
});

articleRouter.delete('/:id', (req, res) => {
  console.log('delete');
  Article.remove({ _id: req.params.id }).exec((err, doc) => {
    if (err) {
      res.status(400).send;
    }
  });
});

export default articleRouter;
