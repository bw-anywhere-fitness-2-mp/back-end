const supertest = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

let token;
let token2;

describe("auth-router", () => {
  describe("POST /register", () => {
    it("should throw error 400 because of missing fields", async () => {
      await db("users")
        .truncate()
        .then(() => db.seed.run());
      await supertest(server)
        .post("/api/auth/register")
        .send({ username: "me", password: "" })
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
    it("registers a client", async () => {
      await supertest(server)
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
    it("registers an instructor", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send({
          email: "@email.com",
          role: "instructor",
          username: "hi",
          password: "helloagain",
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("POST Login", () => {
    it("should see if token property shows up when client signs in", async () => {
      const username = "hello";
      const password = "helloagain";

      await supertest(server)
        .post("/api/auth/login")
        .send({ username: username, password: password })
        .then((res) => {
          // console.log(res.body);
          token = res.body.token;
          expect(res.body).toHaveProperty("token");
        });
    });
    it("should see if token2 property shows up when instructor signs in", async () => {
      const username = "hi";
      const password = "helloagain";

      await supertest(server)
        .post("/api/auth/login")
        .send({ username: username, password: password })
        .then((res) => {
          // console.log(res.body);
          token2 = res.body.token;
          expect(res.body).toHaveProperty("token");
        });
    });
    it("should throw a 401 since theres no user data", async () => {
      await supertest(server)
        .post("/api/auth/login")
        .send({ username: "newaccount", password: "newpassword" })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });
});

describe("client-router.test", () => {
  describe("GET /", () => {
    it("should return 401 since not logged in", async () => {
      await db("users")
        .truncate()
        .then(() => db.seed.run());

      await supertest(server)
        .get("/api/client")
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });

    it("should return json data as res", async () => {
      await supertest(server)
        .get("/api/client")
        .set("Authorization", token)
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("list of classes should be three", async () => {
      await supertest(server)
        .get("/api/client")
        .set("Authorization", token)
        .then((res) => {
          expect(res.body).toHaveLength(3);
        });
    });

    it("should return 200 since logged in", async () => {
      await supertest(server)
        .get("/api/client")
        .set("Authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return 401 since not logged in", async () => {
      await supertest(server)
        .get("/api/client")
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });
});

describe("instructor-router.test", () => {
  describe("GET /", () => {
    it("should return 401 since not logged in", async () => {
      await db("users")
        .truncate()
        .then(() => db.seed.run());

      await supertest(server)
        .get("/api/instructor")
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });

    it("should return json data as res", async () => {
      await supertest(server)
        .get("/api/instructor")
        .set("Authorization", token2)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.type).toMatch(/json/i);
          expect(res.body).toHaveLength(0);
        });
    });
  });
  describe("POST /", () => {
    it("should return 201 when created successfully", async () => {
      await supertest(server)
        .post("/api/instructor")
        .set("Authorization", token2)
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
    it("should return 400 if missing a field", async () => {
      await supertest(server)
        .post("/api/instructor")
        .set("Authorization", token2)
        .send({ name: "Swimming Fundamentals" })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.message).toBe("All fields are required");
        });
    });
  });
  describe("PUT /:id", () => {
    it("should return status 200 if successful", async () => {
      await supertest(server)
        .put("/api/instructor/1")
        .set("Authorization", token2)
        .send({ name: "Advanced kickboxing" })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return updated body", async () => {
      await supertest(server)
        .put("/api/instructor/1")
        .set("Authorization", token2)
        .send({ name: "Advanced kickboxing" })
        .then((res) => {
          expect(res.body).toHaveProperty("name", "Advanced kickboxing");
        });
    });
  });
  describe("DELETE /:id", () => {
    it("returns a status of 200 is successful", async () => {
      await supertest(server)
        .delete("/api/instructor/1")
        .set("Authorization", token2)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("returns status 404 and message if it can't find class with id", async () => {
      await supertest(server)
        .delete("/api/instructor/6")
        .set("Authorization", token2)
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.message).toBe("Could not find a class with that ID");
        });
    });
    it("should return 401 since not logged in", async () => {
      await db("users")
        .truncate()
        .then(() => db.seed.run());
      await supertest(server)
        .get("/api/client")
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });
});

// {
//   "name": "Kickboxing Fundamentals",
//   "type": "kickboxing",
//   "date": "02/02/20",
//   "instructor_name": "Sam",
//   "start_time": "11:30 am",
//   "duration": "1 hour",
//   "intensity": "high",
//   "location": "remote",
//   "current": 10,
//   "maximum": 100
// },
