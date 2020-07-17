const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");
const passport = require("passport");

router.get("/", forwardAuthenticate, require("./controller").home);
router.get("/all", forwardAuthenticate, require("./controller").getAllUsers);
router.get("/dashboard", ensureAuthenticate, require("./controller").dashboard);
router.get("/register", forwardAuthenticate, require("./controller").register);
router.get("/login", forwardAuthenticate, require("./controller").login);
router.post("/register", require("./controller").create);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});
router.get("/logout", require("./controller").logout);

module.exports = router;
