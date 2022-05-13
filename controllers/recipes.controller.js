const recipesModel = require('../models/recipes.models.js');

exports.getRecipes = (req, res, next) => {

    const recipes = recipesModel.getRecipes();
    res.status(200).send({recipes});
}