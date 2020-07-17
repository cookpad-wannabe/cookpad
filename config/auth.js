const ensureAuthenticate = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error_msg", "Please login first");
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);
  }
};

const forwardAuthenticate = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect("/users/dashboard");
};

module.exports = {
  ensureAuthenticate,
  forwardAuthenticate,
};
