const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");

router.post("/", require("./controller").create);
router.get("/", require("./controller").getAllRecipes);
router.get("/page/:UserID", require("./controller").getUserRecipes);
router.put("/edit/:UserID", require("./controller").editUserRecipe);

module.exports = router;
