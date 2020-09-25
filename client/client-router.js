const router = require("express").Router();
const Clients = require("./client-helper");

router.get("/", (req, res) => {
  Clients.find()
    .then((rez) => res.status(200).json(rez))
    .catch((err) => res.status(500).json({ status: 500, err }));
});



module.exports = router;

