import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors';
import session from "express-session";
import UserRoutes from "./Users/routes.js";
import RecipeDetailRoutes from "./RecipeDetail/routes.js";
import RemoteRecipeRoutes from "./RemoteRecipe/routes.js";


const app = express();

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/spark"
mongoose.connect(CONNECTION_STRING);

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "sparksecret", resave: false, saveUninitialized: false, cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
        maxAge: 5 * 60 * 1000 // 1000ms is 1s. This is five minutes.
    }

};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none", secure: true, domain: process.env.NODE_SERVER_DOMAIN,
    };
}


app.use(session(sessionOptions));

app.use(express.json());
const port = process.env.PORT || 4000;
UserRoutes(app);
RecipeDetailRoutes(app);
RemoteRecipeRoutes(app);
app.listen(port);