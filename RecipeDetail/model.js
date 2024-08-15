import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("RecipeDetailModel", schema);
export default model;