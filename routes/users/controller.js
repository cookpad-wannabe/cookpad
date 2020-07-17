const { hashed } = require("../../helpers");
const { User } = require("../../models");

module.exports = {
  home: (req, res) => {
    res.render("welcome");
  },
  login: (req, res) => {
    res.render("login");
  },
  register: (req, res) => {
    res.render("register");
  },
  dashboard: (req, res) => {
    res.render("dashboard", {
      user: req.user,
    });
  },
  create: async (req, res) => {
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
          const hashPassword = await hashed(password);

          const result = await User.create({
            email,
            password: hashPassword,
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
  logout: (req, res) => {
    req.logout();
    res.redirect("/users/login");
  },
};
