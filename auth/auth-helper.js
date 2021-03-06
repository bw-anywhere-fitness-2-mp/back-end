const db = require("../data/db-config");

function add(data) {
  return db("users")
    .insert(data)
    .then(([id]) => {
      return findBy({ id });
    });
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

module.exports = { add, findBy };
