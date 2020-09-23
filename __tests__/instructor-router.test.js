const supertest = require("supertest");

const db = require("../data/db-config");
const server = require("../server");

let token;
describe("instructor-router.test", () => {
  //   beforeAll(async () => {
  //     await dbConfig("users").truncate();
  //   });

  describe("GET /", () => {
    it("should return 401 since not logged in", () => {
      return supertest(server)
        .get("/api/instructor")
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
          token = res.body.token;
          expect(res.body).toHaveProperty("token");
        });
    });
    it("should return json data as res", () => {
      return supertest(server)
        .get("/api/instructor")
        .set("Authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.type).toMatch(/json/i);
          expect(res.body).toHaveLength(0);
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
    it("should return 400 if missing a field", () => {
      return supertest(server)
        .post("/api/instructor")
        .set("Authorization", token)
        .send({ name: "Swimming Fundamentals" })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.message).toBe("All fields are required");
        });
    });
  });
  describe("PUT /:id", () => {
    it("should return status 200 if successful", () => {
      return supertest(server)
        .put("/api/instructor/1")
        .set("Authorization", token)
        .send({ name: "Kickboxing fundamentals" })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return updated body", () => {
      return supertest(server)
        .put("/api/instructor/1")
        .set("Authorization", token)
        .send({ name: "Kickboxing fundamentals" })
        .then((res) => {
          expect(res.body).toHaveProperty("name", "Kickboxing fundamentals");
        });
    });
  });
  describe("DELETE /:id", () => {
    it("returns a status of 200 is successful", () => {
      return supertest(server)
        .delete("/api/instructor/1")
        .set("Authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("returns status 404 and message if it can't find class with id", () => {
      return supertest(server)
        .delete("/api/instructor/6")
        .set("Authorization", token)
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.message).toBe("Could not find a class with that ID");
        });
    });
  });
});
