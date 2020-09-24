const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./auth/auth-router");
const clientRouter = require("./client/client-router");
const instructorRouter = require("./instructor/instructor-router");
const restricted = require("./auth/restricted-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use("/api/auth", authRouter);
server.use("/api/client", restricted, checkRole("client"), clientRouter);
server.use(
  "/api/instructor",
  restricted, //checking for token
  checkRole("instructor"),
  instructorRouter
);

server.get("/", (req, res) => {
  res.status(200).json({ Victor_Frankenstein: "It LIVEEEESSSSSSS" });
});

//checking for client or instructor
function checkRole(role) {
  return (req, res, next) => {
    if (req.jwt.role === role) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  };
}

module.exports = server;
