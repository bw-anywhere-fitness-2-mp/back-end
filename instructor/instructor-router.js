const router = require("express").Router();
const Instructors = require("./instructor-helper");
const restricted = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  // console.log(req.jwt);
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

  Instructors.findBy({ instructor_name: req.jwt.username, id })
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err: err.message });
    });
});

router.post("/", (req, res) => {
  const data = req.body;
  if (
    data.name &&
    data.type &&
    data.date &&
    data.instructor_name &&
    data.start_time &&
    data.duration &&
    data.intensity &&
    data.location &&
    data.current &&
    data.maximum
  ) {
    Instructors.add(data)
      .then((rez) => {
        res.status(201).json(rez);
      })
      .catch((err) => {
        res.status(500).json({ status: 500, err: err.message });
      });
  } else {
    res.status(400).json({ message: "All fields are required" });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Instructors.updateClass(changes, id)
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
        res.status(200).json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find a class with that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 500, err: err.message });
    });
});

module.exports = router;
