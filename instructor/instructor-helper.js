const db = require("../data/db-config");

function add(data) {
  return db("classes")
    .insert(data)
    .then(([id]) => {
      return findBy({ id });
    });
}

function updateClass(changes, id) {
  return db("classes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findBy(filter) {
  return db("classes").where(filter).orderBy("id");
}

function findById(id) {
  return db("classes").where({ id }).first();
}

function remove(id) {
  let removed;
  findById(id).then((rez) => (removed = rez));
  return db("classes")
    .where({ id })
    .del()
    .then(() => {
      return removed;
    });
}

module.exports = {
  add,
  updateClass,
  findBy,
  remove,
  findById,
};
