const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 20, // Max X requests per minute
  message: "Too many requests, please try again later.",
});

module.exports = { limiter };
