const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found in environment variables");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { generateToken };
