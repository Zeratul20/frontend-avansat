exports.up = function (knex) {
    try {
      return knex.schema.createTable("comments", function (table) {
        table.increments();
        table.integer("movieId").notNullable();
        table.integer("userId").notNullable();
        table.string("message").notNullable();

        table.foreign("movieId").references("movies.id");
        table.foreign("userId").references("users.id");
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
      return knex.schema.dropTable("comments");
  };
  