const { hashed } = require("../../helpers");
const { Recipe } = require("../../models");

module.exports = {
  home: async (req, res) => {
    try {
      const results = await Recipe.find();

      console.log({ message: "AddRecipessuccessfull", data: results });
      res.render("home", { result: results });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const result = await Recipe.create({ ...req.body });
      console.log(Recipe);
      res.send({ message: "AddRecipessuccessfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Recipe.findByIdAndDelete(id);

      res.send({ message: "DeleteRecipessuccessfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
};
