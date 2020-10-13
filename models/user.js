const { Model } = require("objection");
const Knex = require("../util/connection");
const Post = require("./post");

Model.knex(Knex);

class User extends Model {
  static tableName = "users";

  static idColumn = "id";

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
