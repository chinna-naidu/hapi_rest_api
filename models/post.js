const { Model } = require("objection");
const Knex = require("../util/connection");

Model.knex(Knex);

class Post extends Model {
  static tableName = "posts";

  static idColumn = "id";
  static jsonSchema = {
    type: "Object",
    required: ["title"],

    properties: {
      id: { type: "integer" },
      title: { type: "string" },
      description: { type: "string" },
      image: { type: "string" },
      created_at: { type: "date" },
      updated_at: { type: "date" },
    },
  };
}

module.exports = Post;
