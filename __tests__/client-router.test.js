const supertest = require("supertest");

const dbConfig = require("../data/db-config");
const server = require("../server");

describe("instructor-router.test", () => {
  beforeAll(async () => {
    await dbConfig("users").truncate();
  });

  describe("GET /", () => {
    it("should return 404 since not logged in", () => {
      return supertest(server)
        .get("/api/client")
        .then((res) => {
          expect(res.status).toBe(404);
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
});
