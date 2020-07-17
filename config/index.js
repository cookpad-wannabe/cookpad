const { PORT, SESSION_SECRET } = require("./environment");
const db = require("./database");
const { ensureAuthenticate, forwardAuthenticate } = require("./auth");
const localPassport = require("./passport");

module.exports = {
  PORT,
  db,
  ensureAuthenticate,
  forwardAuthenticate,
  SESSION_SECRET,
  localPassport,
};
