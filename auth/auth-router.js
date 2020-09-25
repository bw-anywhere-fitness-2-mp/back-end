const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Auth = require("./auth-helper");

//endp
router.post("/register", (req, res) => {
  const user = req.body;

  if (validateUser(user)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(user.password, rounds);
    user.password = hash;
    Auth.add(user)
      .then((user) => {
        // const token = makeJwt(user);
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password. Password should be alphanumeric.",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (validateCreds(req.body)) {
    Auth.findBy({ username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password. Password should be alphanumeric.",
    });
  }
});

function makeJwt(user) {
  const payload = {
    username: user.username,
    role: user.role,
    subject: user.id,
  };
  const config = {
    jwtSecret: process.env.JWT_SECRET || "is it secret, is it safe?",
  };
  const options = {
    expiresIn: "8 hours",
  };
  return jwt.sign(payload, config.jwtSecret, options);
}
//auth for user and pass 
function validateUser(user) {
  return Boolean(
    user.username &&
      user.password &&
      user.role &&
      typeof user.password === "string"
  );
}
//validating info for login
function validateCreds(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}
module.exports = router;
