const recipesModel = require('../models/recipes.models.js');

exports.getRecipes = (req, res, next) => {

    const exclude = req.query.excludes_ingredients;

    const recipes = recipesModel.getRecipes(exclude);
    res.status(200).send({recipes});
}

exports.getSingleRecipe = (req, res, next) => {

    const id = req.params.id;

    const recipe = recipesModel.getSingleRecipe(id);
    res.status(200).send({recipe});
}