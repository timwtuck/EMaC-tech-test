const router = require('express').Router();
const {getRecipes} = require('../controllers/recipes.controller.js');

router.route('/')
    .get(getRecipes);

module.exports = router;