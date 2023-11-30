const request = require("supertest");
const app = require("../../src/index");

let testToken;
let username = "your_user_here";
let email = "your_email_here";
let password = "your_password";

describe("User Registration and Authentication", () => {
  it("should register a new user", async () => {
    try {
      const registration = await request(app).post("/api/users/signup").send({
        username: username,
        email: email,
        password: password,
      });

      expect(registration.statusCode).toEqual(201);
      expect(registration.body).toHaveProperty(
        "message",
        "User created successfully"
      );
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should log in a registered user", async () => {
    try {
      const login = await request(app)
        .post("/api/users/login")
        .send({ username: username, password: password });

      expect(login.statusCode).toEqual(200);
      expect(login.body).toHaveProperty("message", "Logged in successfully");
      expect(login.body).toHaveProperty("token");

      testToken = login.body.token;
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should access secure endpoints with valid token", async () => {
    try {
      const goals = await request(app)
        .get("/api/goals")
        .set("Authorization", `Bearer ${testToken}`);

      expect(goals.statusCode).toEqual(200);
      expect(goals.body).toHaveProperty("msg");
      console.log(testToken);
    } catch (error) {
      throw new Error(error);
    }
  });
});
