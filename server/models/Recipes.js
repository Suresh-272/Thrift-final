import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name : {type: String, required: true},
    caption : [{type: String, required: true}],
    price : {type: String, required: true},
    imageUrl : {type: String, required: true},
    userOwner : {type: mongoose.Schema.Types.ObjectId, ref: "users" ,required: true},

});

export const RecipeModel = mongoose.model("men", RecipeSchema);