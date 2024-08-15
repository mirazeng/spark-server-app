import * as dao from './dao.js';

export default function UserRoutes(app) {

    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const updateUser = async (req, res) => {
        const {userId} = req.params;
        const status = await dao.updateUser(userId, req.body);
        res.json(status);
    };

    const findAllUsers = async (req, res) => {
        const {role, name} = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        const user = await dao.findUserByUsername(req.params.uid);
        res.json(user);
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({message: "Username already exists"});
            return;
        }
        const currentUser = await dao.createUser(req.body)
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const signin = async (req, res) => {
        const {username, password} = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({message: "Unable to login. Try again later."});
        }
    };

    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    const followUser = async (req, res) => {
        const {userId} = req.params;
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to follow a user"});
            return;
        }
        const status = await dao.followUser(currentUser.username, userId);
        res.json(status);
    };

    const unfollowUser = async (req, res) => {
        const {userId} = req.params;
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({message: "You must be logged in to unfollow a user"});
            return;
        }
        const status = await dao.unfollowUser(currentUser.username, userId);
        res.json(status);
    };

    const getFollowing = async (req, res) => {
        const {username} = req.params;
        try {
            const user = await dao.findUserByUsername(username);
            if (!user) {
                res.status(404).json({message: "User not found"});
                return;
            }
            const following = await dao.getFollowing(username);
            res.json(following);
        } catch (error) {
            res.status(500).json({message: "Error fetching following users"});
        }
    };

    const getFollowers = async (req, res) => {
        const {username} = req.params;
        try {
            const user = await dao.findUserByUsername(username);
            if (!user) {
                res.status(404).json({message: "User not found"});
                return;
            }
            const followers = await dao.getFollowers(username);
            res.json(followers);
        } catch (error) {
            res.status(500).json({message: "Error fetching followers"});
        }
    };


    app.post("/api/users", createUser);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.get("/api/users", findAllUsers);

    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
    app.get("/api/users/profile/:uid", findUserById);


    app.post("/api/users/follow/:userId", followUser);
    app.post("/api/users/unfollow/:userId", unfollowUser);

    app.get("/api/users/:username/following", getFollowing);
    app.get("/api/users/:username/followers", getFollowers);

}

