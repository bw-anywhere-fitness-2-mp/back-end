const supertest = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

let token = "aa";
describe("instructor-rotuer", () => {
  describe("POST /register", () => {
    beforeEach(async () => {
      await db.migrate
        .rollback()
        .then(() => db.migrate.latest().then(() => db.seed.run()));
    });
    it("returns status of 200", async () => {
      await supertest(server)
        .post("/api/instructor")
        .send({
          name: "Swimming Fundamentals",
          type: "swimming",
          date: "02/02/20",
          instructor_name: "Sam",
          start_time: "11:30 am",
          duration: "1 hour",
          intensity: "high",
          location: "Community pool",
          current: 10,
          maximum: 100,
        })
        .set("Authorization", token)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });
});
