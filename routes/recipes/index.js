const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");

router.post("/", require("./controller").create);
router.get("/", forwardAuthenticate, require("./controller").home);
router.get("/:id", forwardAuthenticate, require("./controller").delete);

module.exports = router;
