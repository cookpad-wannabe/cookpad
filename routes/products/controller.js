const { hashed } = require("../../helpers");
const { Recipes } = require("../../models");

module.exports = {
  home: async (req, res) => {
    try {
      const results = await Recipes.find();

      console.log({ message: "AddRecipessuccessfull", data: results });
      res.render("home", { result: results });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const result = await Recipes.create({ ...req.body });
      console.log(Recipes);
      res.send({ message: "AddRecipessuccessfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const result = await Recipes.find();

      res.send({ message: "AddRecipessuccessfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  getByUserID: async (req, res) => {
    try {
      const { UserID } = req.params;

      const result = await Recipes.find({ UserID }).populate("UserID");

      res.send({ message: "AddRecipessuccessfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Recipes.findByIdAndDelete(id);

      res.send({ message: "AddRecipessuccessfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
};
