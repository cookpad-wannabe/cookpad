const { hashed } = require("../../helpers");
const { Recipe } = require("../../models");

module.exports = {
  edit: async (req, res) => {
    try {
      const id = req.params.recipeID;
      const recipe = await Recipe.findById(id).exec();
      res.render("edit-resep", { recipe });
      res.send({ result: recipe });
      console.log(recipe);
    } catch (error) {
      console.error(error);
    }
  },
  saveEdit: async (req, res) => {
    const id = req.params.recipeID;

    try {
      await Recipe.findOneAndUpdate({ id }, { $set: { name } });
      const editedRecipe = await Recipe.findById(id).exec();
      console.log(editedRecipe);
      res.send({
        message: `recipe successfully updated`,
        updatedRecipe: editedRecipe,
      });
      res.redirect("/users/dashboard");
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  },
  create: async (req, res) => {
    try {
      const result = await Recipe.create({ ...req.body });

      res.send({ message: "Add Recipe successfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  getAllRecipes: async (req, res) => {
    try {
      const result = await Recipe.find();

      res.send({ message: "Add Recipe successfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  editUserRecipe: async (req, res) => {
    try {
      const { UserID } = req.params;

      const result = await Recipe.find({ UserID }).populate("AuthorID");

      console.log(result);
      res.send({ message: "ok", data: result });
    } catch (error) {
      console.log(error);
    }
  },
};
