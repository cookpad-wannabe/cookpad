const { Recipe, User } = require("../../models");

const fs = require("fs");
// for handling upload imgae
const multer = require("multer");
const storage = multer.memoryStorage();
let upload = multer({ storage: storage });
upload = upload.single("photo");

module.exports = {
  upload,
  // home
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find();

      res.render("home", {
        user: req.user,
        recipes,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getRecipe: async (req, res, next) => {
    const { recipeID } = req.params;
    try {
      const recipe = await Recipe.findById(recipeID);
      const publisher = await User.findById(recipe.AuthorID);

      res.render("recipe.ejs", {
        recipe,
        publisher,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
  getRecipeImage: async (req, res, next) => {
    try {
      const image = await Recipe.findById(req.params.recipeID);
      res.set("Content-Type", image.photo.contentType);
      res.send(image.photo.data);
    } catch (error) {
      next(error);
    }
  },
  // collections
  getUserRecipe: async (req, res, next) => {
    try {
      const recipes = await Recipe.find({
        AuthorID: req.params.UserID,
      });

      res.render("user-collections", {
        user: req.user,
        recipes,
      });
    } catch (error) {
      next(error);
    }
  },
  // add recipe
  addPage: (req, res) => {
    try {
      res.render("add", { user: req.user });
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res, next) => {
    console.log(req.file);
    try {
      const recipeInfo = {
        name: req.body.name,
        portion: req.body.portion,
        duration: req.body.duration,
        ingredients: req.body.ingredients,
        procedures: req.body.procedures,
        AuthorID: req.user._id,
      };
      if (req.file && req.file.buffer) {
        recipeInfo.photo = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      } else {
        const imageData = fs.readFileSync("./resources/banner-edit.png");
        recipeInfo.photo = {
          data: imageData,
          contentType: "image/png",
          // image.src = "https://coubsecureassets-a.akamaihd.net/assets/default-avatars/256-f0d0b2891080bf9c2797d255af3027291aef12c38c6d4a88053f223218ba9ebc.png";
        };
      }
      const result = await Recipe.create(recipeInfo);
      res.send({ message: "Add Recipe successfull", data: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  edit: async (req, res, next) => {
    try {
      console.log(req.user.id, "id user");
      const id = req.params.recipeID;
      const recipe = await Recipe.findById(id);
      console.log("edit resep", recipe);
      res.render("edit-resep", { recipe, user: req.user });
    } catch (error) {
      next(error);
    }
  },
  saveEdit: async (req, res, next) => {
    try {
      const updatedInfo = {
        name: req.body.name,
        portion: req.body.portion,
        duration: req.body.duration,
        ingredients: req.body.ingredients,
        procedures: req.body.procedures,
        AuthorID: req.user._id,
      };
      if (req.file && req.file.buffer) {
        updatedInfo.photo = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const result = await Recipe.findByIdAndUpdate(
        req.params.recipeID,
        updatedInfo,
        { new: true }
      );
      console.log(result.id);
      res.redirect("/recipes/page/" + result.id);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
