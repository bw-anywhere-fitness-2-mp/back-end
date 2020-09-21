exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "sam@sam.com",
          username: "Sam",
          password: "test",
          role: "instructor",
        },
        {
          email: "tim@tim.com",
          username: "Tim",
          password: "test",
          role: "client",
        },
        {
          email: "alex@alex.com",
          username: "Alex",
          password: "test",
          role: "instructor",
        },
      ]);
    });
};
