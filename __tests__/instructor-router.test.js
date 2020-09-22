const supertest = require("supertest");

const db = require("../data/db-config");
const server = require("../server");

let token;
describe("instructor-router.test", () => {
  //   beforeAll(async () => {
  //     await dbConfig("users").truncate();
  //   });

  describe("GET /", () => {
    it("should return 404 since not logged in", () => {
      return supertest(server)
        .get("/api/instructor")
        .then((res) => {
          expect(res.status).toBe(404);
        });
    });

    it("registers a user", async () => {
      await db("users").truncate();
      return supertest(server)
        .post("/api/auth/register")
        .send({
          email: "@gmail.com",
          role: "instructor",
          username: "hello",
          password: "helloagain",
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should see if token property shows up", () => {
      const username = "hello";
      const password = "helloagain";

      return supertest(server)
        .post("/api/auth/login")
        .send({ username: username, password: password })
        .then((res) => {
          console.log(res.body);
          token = res.body.token;
          expect(res.body).toHaveProperty("token");
        });
    });

    it("says res type if error is thrown", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.type).toHaveLength(9);
        });
    });
  });
  describe("POST /", () => {
    it("should return 201 when created successfully", () => {
      return supertest(server)
        .post("/api/instructor")
        .set("Authorization", token)
        .send({
          name: "Swimming Fundamentals",
          type: "Swimming",
          date: "02/02/20",
          instructor_name: "Sam",
          start_time: "11:30 am",
          duration: "1 hour",
          intensity: "high",
          location: "Pool",
          current: 10,
          maximum: 100,
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });
});
