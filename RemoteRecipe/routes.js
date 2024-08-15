import * as dao from "./dao.js";

export default function RemoteRecipeRoutes(app) {

    const searchRemoteRecipes = async (req, res) => {
        const {query} = req.query;
        const currentUser = req.session["currentUser"];

        if (!currentUser || !(await dao.isUserVIPOrAdmin(currentUser.username))) {
            res.status(403).json({message: "Only VIP and Admin users can search remote recipes"});
            return;
        }

        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            console.log(response.data);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({message: "Error fetching remote recipes"});
        }
    };

    const getRemoteRecipeDetails = async (req, res) => {
        const {idMeal} = req.params;
        const currentUser = req.session["currentUser"];

        if (!currentUser || !(await dao.isUserVIPOrAdmin(currentUser.username))) {
            res.status(403).json({message: "Only VIP and Admin users can view remote recipe details"});
            return;
        }

        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);

            res.json(response.data);
        } catch (error) {
            res.status(500).json({message: "Error fetching remote recipe details"});
        }
    };

    const addRemoteRecipeComment = async (req, res) => {
        const {idMeal} = req.params;
        const {comment} = req.body;
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to add a comment"});
            return;
        }

        try {
            const newComment = await dao.addRemoteRecipeComment(idMeal, currentUser.username, comment);
            res.json(newComment);
        } catch (error) {
            res.status(500).json({message: "Error adding comment"});
        }
    };

    const getRemoteRecipeComments = async (req, res) => {
        const {idMeal} = req.params;

        try {
            const comments = await dao.getRemoteRecipeComments(idMeal);
            res.json(comments);
        } catch (error) {
            res.status(500).json({message: "Error fetching comments"});
        }
    };

    const deleteRemoteRecipeComment = async (req, res) => {
        const {commentId} = req.params;
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to delete a comment"});
            return;
        }

        try {
            const comment = await dao.findRemoteRecipeCommentById(commentId);
            if (comment.username !== currentUser.username && currentUser.role !== "ADMIN") {
                res.status(403).json({message: "You can only delete your own comments"});
                return;
            }

            await dao.deleteRemoteRecipeComment(commentId);
            res.json({message: "Comment deleted successfully"});
        } catch (error) {
            res.status(500).json({message: "Error deleting comment"});
        }
    };


    const addRemoteRecipeBookmark = async (req, res) => {
        const {idMeal} = req.params;
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to bookmark a recipe"});
            return;
        }

        try {
            const bookmark = await dao.addRemoteRecipeBookmark(currentUser.username, idMeal);
            res.json(bookmark);
        } catch (error) {
            res.status(500).json({message: "Error adding bookmark"});
        }
    };

    const removeRemoteRecipeBookmark = async (req, res) => {
        const {idMeal} = req.params;
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to remove a bookmark"});
            return;
        }

        try {
            const updatedBookmarks = await dao.removeRemoteRecipeBookmark(currentUser.username, idMeal);
            res.json(updatedBookmarks);
        } catch (error) {
            res.status(500).json({message: "Error removing bookmark"});
        }
    };

    const getUserRemoteRecipeBookmarks = async (req, res) => {
        const {username} = req.params;
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to view bookmarks"});
            return;
        }

        try {
            const bookmarks = await dao.getUserRemoteRecipeBookmarks(username);
            res.json(bookmarks);
        } catch (error) {
            res.status(500).json({message: "Error fetching bookmarks"});
        }
    };

    const isRemoteRecipeBookmarked = async (req, res) => {
        const {idMeal} = req.params;
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to check bookmarks"});
            return;
        }

        try {
            const isBookmarked = await dao.isRemoteRecipeBookmarked(currentUser.username, idMeal);
            res.json({isBookmarked});
        } catch (error) {
            res.status(500).json({message: "Error checking bookmark status"});
        }
    };


    app.get("/api/remote-recipes/search", searchRemoteRecipes);
    app.get("/api/remote-recipes/:idMeal", getRemoteRecipeDetails);
    app.post("/api/remote-recipes/:idMeal/comments", addRemoteRecipeComment);
    app.get("/api/remote-recipes/:idMeal/comments", getRemoteRecipeComments);
    app.delete("/api/remote-recipes/comments/:commentId", deleteRemoteRecipeComment);

    app.post("/api/remote-recipes/:idMeal/bookmark", addRemoteRecipeBookmark);
    app.delete("/api/remote-recipes/:idMeal/bookmark", removeRemoteRecipeBookmark);
    app.get("/api/users/:username/remote-bookmarks", getUserRemoteRecipeBookmarks);
    app.get("/api/remote-recipes/:idMeal/is-bookmarked", isRemoteRecipeBookmarked);
}