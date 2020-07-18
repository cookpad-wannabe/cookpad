const router = require("express").Router();
const { forwardAuthenticate, ensureAuthenticate } = require("../../config");
const methodOverride = require("method-override");

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET", "DELETE"],
  })
);

router.post("/", require("./controller").create);
router.get("/", forwardAuthenticate, require("./controller").home);
router.delete("/:id", forwardAuthenticate, require("./controller").delete);

module.exports = router;
