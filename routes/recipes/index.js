const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");

router.post("/", require("./controller").create);
router.get("/", require("./controller").get);
router.get("/findByUserID/:UserID", require("./controller").getByUserID);

module.exports = router;
