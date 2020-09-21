const db = require("../data/db-config");

function add(data) {
  return db("classes")
    .insert(data)
    .then(([id]) => {
      return findBy({ id });
    });
}

function update(changes, id) {
  return db("classes")
    .update(changes)
    .where({ id })
    .then(([id]) => {
      return findBy({ id });
    });
}

function findBy(filter) {
  return db("classes").where(filter).orderBy("id");
}

function remove(id) {
  let removed;
  findBy({ id }).then((rez) => (removed = rez));
  return db("classes")
    .where({ id })
    .del()
    .then(() => {
      return removed;
    });
}

module.exports = {
  add,
  update,
  findBy,
  remove,
};
