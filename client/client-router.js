const router = require("express").Router();
const Clients = require("./client-helper");

router.get("/", (req, res) => {
  Clients.find()
    .then((rez) => res.status(200).json(rez))
    .catch((err) => res.status(500).json({ status: 500, err }));
});

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   helper
//     .findById(id, "TABLE")
//     .then((rez) => res.status(200).json(rez))
//     .catch((err) => res.status(500).json({ status: 500, err }));
// });

function checkRole(role) {
  return (req, res, next) => {
    if (req.jwt.role === role) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  };
}

module.exports = router;
