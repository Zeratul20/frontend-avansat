exports.up = function (knex) {
    try {
      return knex.schema.createTable("movies", function (table) {
        table.increments();
        table.string("name").notNullable();
        table.integer("likes").notNullable();
        table.string("director").notNullable();
        table.integer("year").notNullable();
        table.string("description")
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
      return knex.schema.dropTable("movies");
  };
  