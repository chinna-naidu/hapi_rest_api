const { Model } = require("objection");
const Knex = require("../util/connection");
const Post = require("./post");

Model.knex(Knex);

class User extends Model {
  static tableName = "users";

  static idColumn = "id";

  static jsonSchema = {
    type: "Object",
    required: ["name", "email", "password"],

    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      created_at: { type: "date" },
      updated_at: { type: "date" },
    },
  };

  static relationMappings = {
    posts: {
      relation: Model.HasManyRelation,
      modelClass: Post,
      join: {
        from: "users.id",
        to: "posts.user_id",
      },
    },
  };
}
module.exports = User;
