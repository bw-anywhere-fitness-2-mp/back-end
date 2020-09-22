const db = require("../data/db-config");

function find() {
  return db("classes");
}

function findBy(filter) {
  return db("classes").where(filter).orderBy("id");
}

// function saveClass(cls) {
//   return db("users_classes")
//     .insert(cls)
//     .then(([id]) => {
//       return findBy({ id });
//     });
// }

module.exports = {
  find,
  findBy,
  // add,
  // update,
  // remove,
  // saveClass
};
