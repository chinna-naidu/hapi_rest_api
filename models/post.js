const { Model } = require("objection");
const Knex = require("../util/connection");

Model.knex(Knex);

class Post extends Model {
  static tableName = "posts";

  static idColumn = "id";
}

module.exports = Post;
