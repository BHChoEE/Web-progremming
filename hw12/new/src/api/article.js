import { Router } from 'express';

import models from '../models';

const { articles, Tag, articlesTag } = models;

const articleRouter = new Router();

articleRouter.get('/oneuser/:userId', async (req, res) => {
  try {
    console.log('req.params.userId',req.params.userId);
    const article = await articles.findAll({where:{userId:req.params.userId}});
    res.json(article);
  } catch (err) {
    console.error(err);
  }
});

articleRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const article = await articles.findById(id);
  res.json(article);
});

articleRouter.post('/', async (req, res) => {
  const { title, content, tags ,userId} = req.body;
  console.log('req.body',req.body);
  const article = await articles.create({
    title,
    content,
    userId,
  });

  for (let i = 0; i < tags.length; i += 1) {
    const [tag] = await Tag.findOrCreate({
      where: {
        name: tags[i],
      },
    });

    await articlesTag.create({
      articleId: article.id,
      tagId: tag.id,
    });
  }

  res.json(article);
});

articleRouter.put('/:id', async (req, res) => {
  const { title, content, tags } = req.body;
  const id = req.params.id;
  await articles.update({
    title,
    content,
  }, {
    where: {
      id,
    },
  });

  // FIXME: tags

  const article = await articles.findById(id);
  res.json(article);
});

articleRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await articles.destroy({
    where: {
      id,
    },
  });

  res.json({
    deletedId: +id,
  });
});

export default articleRouter;
