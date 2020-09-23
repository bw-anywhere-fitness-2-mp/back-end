const router = require("express").Router();
const Clients = require("./client-helper");

router.get("/", (req, res) => {
  Clients.find()
    .then((rez) => res.status(200).json(rez))
    .catch((err) => res.status(500).json({ status: 500, err }));
});

// router.get("/search", (req, res) => {
//   Clients.findBy({ [req.body.category]: req.body.name })
//     .then((rez) => {
//       res.status(200).json(rez);
//     })
//     .catch((err) => {
//       res.status(500).json({ status: 500, err: err.message });
//     });
// });

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   helper
//     .findById(id, "TABLE")
//     .then((rez) => res.status(200).json(rez))
//     .catch((err) => res.status(500).json({ status: 500, err }));
// });

module.exports = router;

// Axios.get("", () => {
//   const searchObj = {
//     category: formValues.asdjnask
//     name: formValues.eiubfieub
//   }
// })
