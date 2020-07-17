const { hashed } = require("../../helpers");
const { Recipe } = require("../../models");

module.exports = {
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
  getUserRecipes: async (req, res) => {
    try {
      const { UserID } = req.params;

      const result = await Recipe.find({ UserID }).populate("AuthorID");

      console.log(result);
      res.send({ message: "ok", data: result });
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
