import * as dao from './dao.js';

export default function RecipeDetailRoutes(app) {
    const createRecipe = async (req, res) => {
        const recipe = await dao.createRecipe(req.body);
        res.json(recipe);
    };

    const deleteRecipe = async (req, res) => {
        const status = await dao.deleteRecipe(req.params.recipeID);
        res.json(status);
    };

    const updateRecipe = async (req, res) => {
        const {recipeID} = req.params;
        const status = await dao.updateRecipe(recipeID, req.body);
        res.json(status);
    };

    const findAllRecipes = async (req, res) => {
        const {name, ingredient, creator} = req.query;
        if (name) {
            const recipes = await dao.findRecipesByName(name);
            res.json(recipes);
            return;
        }
        if (ingredient) {
            const recipes = await dao.findRecipesByIngredient(ingredient);
            res.json(recipes);
            return;
        }
        if (creator) {
            const recipes = await dao.findRecipesByCreator(creator);
            res.json(recipes);
            return;
        }
        const recipes = await dao.findAllRecipes();
        res.json(recipes);
    };

    const findRecipeById = async (req, res) => {
        const recipe = await dao.findRecipeById(req.params.recipeID);
        res.json(recipe);
    };

    const incrementLikes = async (req, res) => {
        const {recipeID} = req.params;
        const status = await dao.incrementLikes(recipeID);
        res.json(status);
    };

    app.post("/api/recipes", createRecipe);
    app.put("/api/recipes/:recipeID", updateRecipe);
    app.delete("/api/recipes/:recipeID", deleteRecipe);
    app.get("/api/recipes", findAllRecipes);
    app.get("/api/recipes/:recipeID", findRecipeById);
    app.put("/api/recipes/:recipeID/like", incrementLikes);
}