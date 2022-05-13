const db = require('../data/getData.js');
const errors = require('../errors.js');

exports.getRecipes = (query) => {

    if(!query) {
        return db;
    }

    // convert to singular words, and convert ot regex
    const singular = query.replace(/s(?=,)|s$/g, '');
    const exclude = singular.replace(/,/g, '|');
    const excludeRegex = new RegExp(`(${exclude})`);

    // filter recipes containing regex
    const filteredRecipes = db.filter(recipe => {

        for (const ingredient of recipe.ingredients) {
            if (excludeRegex.test(ingredient.name)) {
                return false;
            }
        }
        return true;
    });

    return filteredRecipes.map(recipe => {
        recipe.ingredients = simplifyIngredients(recipe.ingredients);
        return recipe;
    });
}

exports.getSingleRecipe = (id) => {

    if (!validateId(id)) {
        return Promise.reject(errors.invalidID);
    }
        
    const recipe = db.filter(recipe => recipe.id === id);

    if (recipe.length === 0) {
        return Promise.reject(errors.IDNotFound);
    }

    recipe[0].ingredients = simplifyIngredients(recipe[0].ingredients);
    return recipe[0];
}

const validateId = (id) => {

    if (!id || !/^recipe-[0-9]+/.test(id)) {
        return false;
    }

    return true;
}

const simplifyIngredients = (ingredients) => {

    const simplified = [];

    ingredients.forEach(ingredient => {
        
        const index = simplified.map(ingredient => ingredient.name)
            .indexOf(ingredient.name);

        // if doesn't exist, push to array, otherwise add grams
        if(index === -1){
            simplified.push(ingredient);
        } else {
            simplified[index].grams += ingredient.grams;
        }
    });

    return simplified;
}