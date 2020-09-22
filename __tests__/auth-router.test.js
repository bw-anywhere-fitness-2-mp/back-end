const supertest = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

describe("auth-router", () => {
  describe("POST /register", () => {
    beforeEach(async () => {
      await db.migrate
        .rollback()
        .then(() => db.migrate.latest().then(() => db.seed.run));
    });
  });
});
