const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");
const controller = require("./controller");

// home
router.get("/", require("./controller").getAllRecipes);
router.get("/page/:recipeID", require("./controller").getRecipe);
router.get("/image/:recipeID", require("./controller").getRecipeImage);
// add recipe page
router.get("/add", ensureAuthenticate, require("./controller").addPage);
router.post("/add", ensureAuthenticate, controller.upload, controller.create);

// collections page
router.get(
  "/collections/:UserID",
  ensureAuthenticate,
  require("./controller").getUserRecipe
);

// edit
router.get("/edit/:recipeID", ensureAuthenticate, require("./controller").edit);
router.put(
  "/edit/:recipeID",
  ensureAuthenticate,
  controller.upload,
  controller.saveEdit
);

// delete
router.delete(
  "/:recipeID",
  ensureAuthenticate,
  require("./controller").deleteRecipe
);
module.exports = router;
