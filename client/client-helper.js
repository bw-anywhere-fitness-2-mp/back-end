const db = require("../data/db-config");

function find() {
  return db("classes");
}

function findBy(filter) {
  return db("classes").where(filter).orderBy("id");
}

module.exports = {
  find,
  findBy,
  // add,
  // update,
  // remove,
};
