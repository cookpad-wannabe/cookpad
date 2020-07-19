const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");
const controller = require("./controller");

// home
router.get("/", forwardAuthenticate, require("./controller").getAllRecipes);
router.get(
  "/:recipeID",
  forwardAuthenticate,
  require("./controller").getRecipe
);
// add recipe page
router.get("/new", ensureAuthenticate, require("./controller").addPage);
router.post("/", ensureAuthenticate, controller.upload, controller.create);

// collections page
router.get(
  "/collections/:UserID",
  ensureAuthenticate,
  require("./controller").getUserRecipe
);
router.get("/image/:recipeID", require("./controller").getRecipeImage);

// edit
router.get("/edit/:recipeID", ensureAuthenticate, require("./controller").edit);
router.put(
  "/edit/:recipeID",
  ensureAuthenticate,
  controller.upload,
  controller.saveEdit
);

module.exports = router;
