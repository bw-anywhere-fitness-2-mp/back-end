const router = require("express").Router();
const Instructors = require("./instructor-helper");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, checkRole("instructor"), (req, res) => {
  console.log(req.jwt);
  Instructors.findBy({ instructor_name: req.jwt.username })
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err: err.message });
    });
});

router.get("/:id", restricted, (req, res) => {
  const id = req.params.id;

  Instructors.findBy({ instructor_name: req.jwt.username, id })
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err: err.message });
    });
});

router.post("/", restricted, (req, res) => {
  const data = req.body;
  Instructors.add(data)
    .then((rez) => {
      if (
        data.name &&
        data.type &&
        data.instructor_name &&
        data.start_time &&
        data.duration &&
        data.intensity &&
        data.location &&
        data.current &&
        data.maximum
      ) {
        res.status(201).json(rez);
      } else {
        res.status(400).json({ message: "All fields are required" });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Instructors.update(changes, id)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((err) => {
      console.log(changes, id);
      res.status(500).json({ status: 500, err: err.message });
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
