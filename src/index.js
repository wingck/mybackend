import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://ckwwingo:Wingo1995@recipes.lwrywgb.mongodb.net/recipes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server is running on port ${port}`));
