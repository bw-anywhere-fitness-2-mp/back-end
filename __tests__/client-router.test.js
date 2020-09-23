const supertest = require("supertest");

const db = require("../data/db-config");
const server = require("../server");

describe("instructor-router.test", () => {
  //   beforeAll(async () => {
  //     await dbConfig("users").truncate();
  //   });

  describe("GET /", () => {
    it("should return 401 since not logged in", () => {
      return supertest(server)
        .get("/api/client")
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
    it("registers a user", async () => {
      await db.migrate
        .rollback()
        .then(() => db.migrate.latest().then(() => db.seed.run()));
      return supertest(server)
        .post("/api/auth/register")
        .send({
          email: "@gmail.com",
          role: "client",
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
          token = res.body.token;
          expect(res.body).toHaveProperty("token");
        });
    });
    it("should return 200 since logged in", () => {
      return supertest(server)
        .get("/api/client")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});
