import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    id: req.body.id,
    title: req.body.title,
    image: req.body.image,
    imageType: req.body.imageType,
    calories: req.body.calories,
    protein: req.body.protein,
    fat: req.body.fat,
    carbs: req.body.carbs,
    day: req.body.day,
    time: req.body.time,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        id: result.id,
        title: result.title,
        image: result.image,
        imageType: result.imageType,
        calories: result.calories,
        protein: result.protein,
        fat: result.fat,
        carbs: result.carbs,
        day: result.day,
        time: result.time,
        _id: result._id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  try {
    const recipeId = req.body.recipeID;
    const userId = req.body.userID;

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { savedRecipes: recipeId } },
      { new: true }
    );

    const user = await UserModel.findById(userId).populate("savedRecipes");

    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Recipe
router.delete("/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    // Delete the recipe from RecipesModel collection
    await RecipesModel.findByIdAndDelete(recipeId);

    // Remove the recipe from all users' savedRecipes
    await UserModel.updateMany(
      {},
      { $pull: { savedRecipes: recipeId } },
      { multi: true }
    );

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId).populate(
      "savedRecipes"
    );

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a recipe by ID
router.put("/:recipeId", async (req, res) => {
  console.log(req.body);
  try {
    const recipeId = req.params.recipeId;
   
    // Find the recipe by ID and update its properties
    const updatedRecipe = await RecipesModel.findByIdAndUpdate(
      recipeId,
      {
        title: req.body.title,
        image: req.body.image,
        imageType: req.body.imageType,
        calories: req.body.calories, // corrected here
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
        day: req.body.day,
        time: req.body.time,
      },
      { new: true }
    );
    console.log(updatedRecipe);
 
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
 });
 


export { router as recipesRouter };
