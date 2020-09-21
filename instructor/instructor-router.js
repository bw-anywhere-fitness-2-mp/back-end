const router = require("express").Router();
const Instructors = require("./instructor-helper");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
  console.log(req.jwt);
  Instructors.findBy({ instructor_name: req.jwt.username })
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err: err.message });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const username = req.body;

  Instructors.findBy({ id })
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err: err.message });
    });
});

router.post("/", (req, res) => {
  const data = req.body;
  Instructors.add(data)
    .then((rez) => {
      res.status(201).json(rez);
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Instructors.findBy({ id })
    .then((rez) => {
      if (rez) {
        Instructors.update(changes, id).then((updated) => {
          res.status(200).json(updated);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find a class with that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Instructors.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find a class with that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err });
    });
});

function checkRole(role) {
  return (req, res, next) => {
    console.log(req.jwt);
    if (req.jwt.role === role) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  };
}

module.exports = router;
