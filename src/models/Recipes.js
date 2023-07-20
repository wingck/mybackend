import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },

  imageType: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  protein: {
    type: String,
    required: true,
  },
  fat: {
    type: String,
    required: true,
  },
  carbs: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const RecipesModel = mongoose.model("recipes", recipeSchema);
