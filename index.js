const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayout = require("express-ejs-layouts");

const { PORT, db, SESSION_SECRET } = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./config").localPassport();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

app.use(expressLayout);
app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs", {
    user: req.user,
  });
});
app.use("/users", require("./routes/users"));
app.use("/recipes", require("./routes/recipes"));

if (db) {
  app.listen(PORT, () => {
    console.log(`this app listen on PORT: ${PORT}`);
  });
}
