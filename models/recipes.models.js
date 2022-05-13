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

    return filteredRecipes;
}

exports.getSingleRecipe = (id) => {

    if (!validateId(id)) {
        return Promise.reject(errors.invalidID);
    }
        
    const recipe = db.filter(recipe => recipe.id === id);

    if (recipe.length === 0) {
        return Promise.reject(errors.IDNotFound);
    }

    return recipe[0];
}

const validateId = (id) => {

    if (!id || !/^recipe-[0-9]+/.test(id)) {
        return false;
    }

    return true;
}