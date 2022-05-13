const recipesModel = require('../models/recipes.models.js');

exports.getRecipes = (req, res, next) => {

    const exclude = req.query.excludes_ingredients;

    const recipes = recipesModel.getRecipes(exclude);
    res.status(200).send({recipes});
}