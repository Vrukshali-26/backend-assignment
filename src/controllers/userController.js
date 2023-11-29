const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { hashPassword, verifyPassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generateToken");

const prisma = new PrismaClient();

// @desc    Create a user
// @route   POST /api/user/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // check if user exist
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // if user doesn't exist then create the user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    if (user) {
      res.status(201).json({
        message: "User created successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc    Authenticate a user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    // check for username and email
    const user = await prisma.user.findUnique({ where: { username } });
    // console.log(user);
    if (user && (await verifyPassword(password, user.password))) {
      res.json({
        message: "Logged in successfully",
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { registerUser, loginUser };
