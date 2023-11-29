const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const myGoals = asyncHandler(async (req, res) => {
  const goals = await prisma.goals.findMany({
    where: { userId: req.user.id },
  });
  res.status(200).json({ msg: goals });
});

// @desc    Create Goals
// @route   PUT /api/goals
// @access  Private
const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  const goal = await prisma.goals.create({
    data: {
      title: req.body.title,
      userId: req.user.id,
    },
  });

  res.status(200).json({ msg: goal });
});

// @desc    Update a particular Goals
// @route   PUT /api/goals
// @access  Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await prisma.goals.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged user matches the goal user
  if (goal.userId !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update the goal using Prisma's update method
  const updatedGoal = await prisma.goals.update({
    where: { id: parseInt(req.params.id) },
    data: {
      title: req.body.title,
    },
  });

  res.status(200).json({ msg: updatedGoal });
});

// @desc    Delete Goals
// @route   DELETE /api/goals
// @access  Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await prisma.goals.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged user matches the goal user
  if (goal.userId !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedGoal = await prisma.goals.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(200).json({ msg: deletedGoal });
});

module.exports = {
  myGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};
