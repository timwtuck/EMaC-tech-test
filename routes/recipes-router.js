const router = require('express').Router();
const controller = require('../controllers/recipes.controller.js');

router.route('/')
    .get(controller.getRecipes);

router.route('/:id')
    .get(controller.getSingleRecipe);

module.exports = router;