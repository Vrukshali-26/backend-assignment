const request = require("supertest");
const app = require("../../src/index");

testToken = "pass_token_here";

describe("Secure Controller Endpoints", () => {
  console.log(testToken);
  // Test GET /api/goals
  it("should fetch user goals", async () => {
    const res = await request(app)
      .get("/api/goals")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toEqual(200);
  });

  // Test POST /api/goals
  it("should create a new goal", async () => {
    console.log(testToken);
    const res = await request(app)
      .post("/api/goals")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ title: "New goal by the user" });

    expect(res.statusCode).toEqual(201);
  });

  // Test PUT /api/goals/:id
  it("should update a goal", async () => {
    console.log(testToken);
    const res = await request(app)
      .put("/api/goals/26") //give id here -> give respected id to the user
      .set("Authorization", `Bearer ${testToken}`)
      .send({ title: "Updated Goal" });

    expect(res.statusCode).toEqual(200);
  });

  // Test DELETE /api/goals/:id
  it("should delete a goal", async () => {
    console.log(testToken);
    const res = await request(app)
      .delete("/api/goals/27") //give id here -> give respected id to the user
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toEqual(200);
  });
});
