const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");
const passport = require("passport");

router.get("/", forwardAuthenticate, require("./controller").getAllUsers);
router.get(
  "/register",
  forwardAuthenticate,
  require("./controller").pageRegister
);
router.post("/register", require("./controller").register);
router.get("/login", forwardAuthenticate, require("./controller").pageLogin);
router.post("/login", (req, res, next) => {
  router.get("/", ensureAuthenticate, require("./controller").home);
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", require("./controller").logout);

module.exports = router;
