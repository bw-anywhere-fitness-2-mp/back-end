exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users_classes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users_classes").insert([
        { user_id: 1, class_id: 1 },
        { user_id: 3, class_id: 2 },
        { user_id: 1, class_id: 3 },
      ]);
    });
};
