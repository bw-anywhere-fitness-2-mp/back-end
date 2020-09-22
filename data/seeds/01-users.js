const bcryptjs = require("bcryptjs");

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
          password: bcryptjs.hashSync("test", 4),
          role: "instructor",
        },
        {
          email: "tim@tim.com",
          username: "Tim",
          password: bcryptjs.hashSync("test", 4),
          role: "client",
        },
        {
          email: "alex@alex.com",
          username: "Alex",
          password: bcryptjs.hashSync("test", 4),
          role: "instructor",
        },
      ]);
    });
};
