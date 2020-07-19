const { hashed } = require("../../helpers");
const { User, Recipe } = require("../../models");

module.exports = {
  pageRegister: (req, res) => {
    res.render("register", { user: req.user });
  },
  register: async (req, res) => {
    try {
      const { email, password, fullname, username, confirmPassword } = req.body;
      const errors = [];

      const result = await User.findOne({ email });

      if (!email || !password || !fullname || !username || !confirmPassword) {
        errors.push({ msg: "Please input all fields" });
      }
      if (password !== confirmPassword) {
        errors.push({ msg: "Password is not match" });
      }
      if (password.length < 6) {
        errors.push({ msg: "Password length minimal is 6" });
      }

      if (errors.length > 0) {
        res.render("register", {
          errors,
          email,
          password,
          fullname,
          username,
          confirmPassword,
        });
      } else {
        if (!result) {
          const hashedPassword = await hashed(password);

          const result = await User.create({
            email,
            password: hashedPassword,
            fullname,
            username,
          });
          if (result) {
            req.flash("success_msg", "You are now can login");
          }
          res.redirect("/users/login");
        } else {
          errors.push({ msg: "Email is registered" });
          res.render("register", {
            errors,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  pageLogin: (req, res) => {
    res.render("login", { user: req.user });
  },
  dashboard: async (req, res) => {
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
  edit: (req, res) => {
    res.render("edit-resep");
  },
  getAllUsers: async (req, res) => {
    try {
      const results = await User.find();

      res.send({ message: "UsersData:", data: results });
    } catch (error) {
      console.log(error);
    }
  },

  logout: async (req, res) => {
    req.logout();
    res.redirect("/");
  },
};
