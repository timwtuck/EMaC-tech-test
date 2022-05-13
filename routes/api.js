const apiRouter = require('express').Router();

apiRouter.get('/recipes', );


apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});


module.exports = apiRouter;
