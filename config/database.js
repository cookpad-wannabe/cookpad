const mongoose = require("mongoose");
const { DATABASE } = require("./environment");

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Success connect to database");
  })
  .catch((error) => {
    console.log(error);
  });

const db = mongoose.connection;

module.exports = db;
