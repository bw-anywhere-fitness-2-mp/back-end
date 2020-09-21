exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();

      tbl.string("email").notNullable().unique();
      tbl.string("username").notNullable().unique();
      tbl.string("password").notNullable();
      tbl.string("role").notNullable();
    })
    .createTable("classes", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("type").notNullable();
      tbl.string("instructor_name").notNullable();
      tbl.string("start_time").notNullable();
      tbl.string("duration").notNullable();
      tbl.string("intensity").notNullable();
      tbl.string("location").notNullable();
      tbl.integer("current").notNullable();
      tbl.integer("maximum").notNullable();
    })
    .createTable("users_classes", (tbl) => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("class_id")
        .unsigned()
        .references("id")
        .inTable("classes")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users_classes")
    .dropTableIfExists("classes")
    .dropTableIfExists("users");
};
