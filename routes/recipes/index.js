const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");

router.post("/", ensureAuthenticate, require("./controller").create);
router.get("/", ensureAuthenticate, require("./controller").getAllRecipes);
router.get(
  "/edit/:recipeID",
  forwardAuthenticate,
  require("./controller").edit
);
router.put(
  "/edit/:recipeID",
  forwardAuthenticate,
  require("./controller").saveEdit
);
router.put(
  "/edit/:UserID",
  ensureAuthenticate,
  require("./controller").editUserRecipe
);

module.exports = router;
