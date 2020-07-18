const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  portion: {
    type: Number,
    // required: true,
  },
  duration: {
    type: String,
    // required: true,
  },
  AuthorID: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  procedures: {
    type: Array,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipes = mongoose.model("recipes", RecipeSchema);

module.exports = Recipes;
