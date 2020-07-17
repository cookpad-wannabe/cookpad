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
  get: async (req, res) => {
    try {
      const result = await Recipe.find().populate("UserID");

      res.send({ message: "Add Recipe successfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
  getByUserID: async (req, res) => {
    try {
      const { UserID } = req.params;

      const result = await Recipe.find({ UserID }).populate("UserID");

      res.send({ message: "Add Recipe successfull", data: result });
    } catch (error) {
      console.log(error);
    }
  },
};
