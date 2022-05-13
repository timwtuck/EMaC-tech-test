const db = require('../data/getData.js');

exports.getRecipes = (query) => {

    if(!query)
        return db;

    // convert to singular words, and convert ot regex
    const singular = query.replace(/s(?=,)|s$/g, '');
    const exclude = singular.replace(/,/g, '|');
    const excludeRegex = new RegExp(`(${exclude})`);

    // filter recipes containing regex
    const filteredRecipes = db.filter(recipe => {

        for (const ingredient of recipe.ingredients){
            if (excludeRegex.test(ingredient.name)){
                return false;
            }
        }
        return true;
    });

    return filteredRecipes;
}