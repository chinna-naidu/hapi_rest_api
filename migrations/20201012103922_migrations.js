// const knex = require("../util/connection");
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("image").notNullable();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("cascade");
    table.timestamps(true, true);
  });
  return true;
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("posts");
  await knex.schema.dropTableIfExists("users");
  return true;
};
