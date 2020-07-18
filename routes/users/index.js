const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");
const passport = require("passport");

router.get("/all", forwardAuthenticate, require("./controller").getAllUsers);
router.get(
  "/register",
  forwardAuthenticate,
  require("./controller").pageRegister
);
router.post("/register", require("./controller").register);
router.get("/login", forwardAuthenticate, require("./controller").pageLogin);
router.post("/login", (req, res, next) => {
  router.get("/dashboard", ensureAuthenticate, require("./controller").login);
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});
router.get("/logout", require("./controller").logout);

router.get(
  "/:userId/recipes",
  ensureAuthenticate,
  require("./controller").getUserRecipes
);

module.exports = router;
