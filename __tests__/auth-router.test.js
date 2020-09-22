const supertest = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

describe("auth-router", () => {
  describe("POST /register", () => {
    beforeEach(async () => {
      await db.migrate
        .rollback()
        .then(() => db.migrate.latest().then(() => db.seed.run()));
    });
    it("returns status 400 if info is invalid", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send({})
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
    // it("returns 201");
  });
});
