const KnexConfig = require("../knexfile");
const Knex = require("knex");

module.exports = Knex(KnexConfig.development);