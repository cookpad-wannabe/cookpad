const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const { compared } = require("../helpers");

const localPassport = () => {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: "Email is not registered",
          });
        }

        const result = await compared(password, user.password);

        if (result) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Password is incorrect",
          });
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

module.exports = localPassport;
