// setup.js

const { PrismaClient } = require("@prisma/client");

let prisma;

beforeAll(async () => {
  // Initialize Prisma connection for testing
  prisma = new PrismaClient();
});

afterAll(async () => {
  // Close Prisma connection after all tests have completed
  await prisma.$disconnect();
});
