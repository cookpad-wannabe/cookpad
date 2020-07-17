const bcrypt = require("bcryptjs");

const hashed = async (password) => {
  const result = await bcrypt.hash(password, 10);

  return result;
};

const compared = async (plainPassword, hashPassword) => {
  const result = await bcrypt.compare(plainPassword, hashPassword);

  return result;
};

module.exports = {
  hashed,
  compared,
};
