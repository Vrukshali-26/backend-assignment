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

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.route("/goals").get(protect, myGoals).post(protect, createGoals);
router
  .route("/goals/:id")
  .put(protect, updateGoals)
  .delete(protect, deleteGoals);

module.exports = router;
