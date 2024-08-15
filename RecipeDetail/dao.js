import model from "./model.js";

export const createRecipe = (recipe) => {
    return model.create(recipe);
}

export const findAllRecipes = () => model.find();
export const findRecipeById = (recipeId) => model.findById(recipeId);
export const findRecipesByName = (name) => {
    const regex = new RegExp(name, "i");
    return model.find({name: {$regex: regex}});
};

export const updateRecipe = (recipeId, recipe) => model.updateOne({_id: recipeId}, {$set: recipe});
export const deleteRecipe = (recipeId) => model.deleteOne({_id: recipeId});

export const findRecipesByCreator = (username) => model.find({creator: username});

export const findRecipesByIngredient = (ingredient) => {
    const regex = new RegExp(ingredient, "i");
    return model.find({description: {$regex: regex}});
};

export const incrementLikes = (recipeId) =>
    model.findByIdAndUpdate(recipeId, { $inc: { likes: 1 } }, { new: true });