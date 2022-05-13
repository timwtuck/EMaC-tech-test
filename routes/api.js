const apiRouter = require('express').Router();
const recipesRouter = require('./recipes-router.js');

apiRouter.use('/recipes', recipesRouter);

apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});


module.exports = apiRouter;
