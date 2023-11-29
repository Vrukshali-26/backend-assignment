const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {
  myGoals,
  createGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/secureController");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/rateLimiter");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router
  .route("/goals")
  .get(protect, limiter, myGoals)
  .post(protect, limiter, createGoals);
router
  .route("/goals/:id")
  .put(protect, limiter, updateGoals)
  .delete(protect, limiter, deleteGoals);

module.exports = router;
