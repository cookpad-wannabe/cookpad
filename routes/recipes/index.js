const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");


router.get("/", require("./controller").getAllRecipes);
router.get("/page/:UserID", require("./controller").getUserRecipes);
router.put("/edit/:UserID", require("./controller").editUserRecipe);
router.get("/", forwardAuthenticate, require("./controller").home);
router.get("/:id", forwardAuthenticate, require("./controller").delete);


module.exports = router;
